let container = document.querySelector(".container");
let apiUrl = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
let select = document.querySelector("select");
let main = document.querySelector("main");

function handleLoading(status = true) {
    if (status) {
        container.innerHTML = `<div class="center flex"><div class="donut"></div></div>`;
    }
}


function createUI(arr) {
    container.innerHTML = "";
    arr.forEach((elm) => {
        let article = document.createElement("article");
        article.classList.add("flex");
        let div = document.createElement("div");
        div.classList.add("flex-45");
        let img = document.createElement("img");
        img.style.width = "100%";
        img.style.height = "100%";
        img.src = elm.imageUrl;
        div.append(img);
        let div1 = document.createElement("div");
        div1.classList.add("flex-45");
        let h2 = document.createElement("h2");
        h2.innerText = elm.newsSite;
        let p = document.createElement("p");
        p.innerText = elm.title;
        let div3 = document.createElement("div");
        div3.classList.add("text-right");
        let a = document.createElement("a");
        a.href = elm.url;
        a.innerText = `Read More`;
        div3.append(a);
        div1.append(h2, p, div3);
        article.append(div, div1);
        container.append(article);
    });
}


function init() {
    handleLoading(true);
    fetch(apiUrl).then((response) => {
        if (!response.ok) {
            throw new Error("Check Your Internet Connection.")
        }
        return response.json();
    }).then(function forEachNews(arr) {
        handleLoading();
        createUI(arr);

        select.addEventListener("change", (e) => {
            let value = e.target.value;
            let filteredArr = arr.filter((elm) => elm.newsSite === value);
            if (value === "news") {
                createUI(arr);
            } else {
                createUI(filteredArr);
            }
        })
    }).catch((error) => {
        main.innerHTML = "";
        let h4 = document.createElement("h4");
        h4.innerText = error;
        h4.style.textAlign = "center";
        h4.style.color = "red";
        main.append(h4);
    });
}


init();