let ul = document.querySelector("ul");
let url = "https://basic-todo-api.vercel.app/api/todo";
let inputField = document.querySelector(".first-input");

inputField.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        let value = e.target.value;
        let data = {
            todo: {
                title: `${value}`,
                isCompleted: false,
            }
        };
        e.target.value = "";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then((res) => {
            createUI(res.todos);
        })
    }
})

function handleToggle(event, baseUrl) {
    let status = event.target.checked;
    let updatedData = {
        todo: {
            isCompleted: `${status}`,
        }
    };

    fetch(baseUrl, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    }).then((res2) => res2.json()).then((res2) => console.log(res2.todos));
}

function deleteTodo(event, url1) {
    fetch(url1, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    }).then((res3) => res3.json()).then((res3) => {
        event.target.parentElement.classList.add("display-none");
        createUI(res3.todos);
    });
}

function handleDblClickOnTodo(parentElm, htmlElm, value, url) {
    let input = document.createElement("input");
    input.type = "text";
    input.value = value;

    parentElm.replaceChild(input, htmlElm);
    input.focus();

    input.addEventListener("blur", (e) => {
        let newValue = e.target.value;
        htmlElm.innerText = newValue;
        parentElm.replaceChild(htmlElm, input);

        let updatedTodo = {
            todo: {
                title: newValue,
            }
        }

        fetch(url, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updatedTodo),
        }).then((res) => res.json()).then((res) => {
            createUI(res.todos);
        });
    })

    input.addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
            input.blur();
        }
    })
}




function createUI(arr = [], rootElm = ul) {
    rootElm.innerHTML = "";
    arr.forEach((elm, i) => {
        let li = document.createElement("li");
        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = i;
        input.checked = elm.isCompleted;
        input.addEventListener("click", (event) => { handleToggle(event, url + `/${elm._id}`); })
        let label = document.createElement("label");
        label.innerText = elm.title;
        label.setAttribute("for", i);
        li.addEventListener("dblclick", () => { handleDblClickOnTodo(li, label, elm.title, url + `/${elm._id}`, ) })
        let button = document.createElement("button");
        button.innerText = "❌";
        button.className = "btn";
        button.addEventListener("click", (event) => { deleteTodo(event, url + `/${elm._id}`) })
        li.append(input, label, button);
        ul.append(li);
    });
}

function getTodo(url) {
    return fetch(url).then((res) => res.json()).then((todosArr) => {
        console.log(todosArr)
        createUI(todosArr.todos, ul);
    })
}

getTodo(url);