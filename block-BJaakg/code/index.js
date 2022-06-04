(function() {
    let cardContainer = document.querySelector(".card-cnt");
    let charactersContainer = document.querySelector(".characters-cnt");
    let ul = document.querySelector("ul");

    function handleSpinner(rootElm, status) {
        if (status) {
            rootElm.innerHTML = `<div class="center"><div class="donut"></div></div>`;
        }
    }

    let cancelButton = document.querySelector(".cancel");

    cancelButton.addEventListener("click", (e) => {
        charactersContainer.classList.add("display-none");
    })


    function handleCharactersButton(arr) {
        charactersContainer.classList.remove("display-none");
        handleSpinner(ul, true);
        // return arr.forEach(function(characterLink) {
        //     fetch(characterLink).then((res) => {
        //         return res.json();
        //     }).then((character) => {
        //         handleSpinner(ul);
        //         let li = document.createElement("li");
        //         li.innerText = `${character.name}: ( ${character.aliases.join(" ")} )`;
        //         ul.append(li);

        //     })
        // })

        Promise.all(
            arr.map(function(characterLink) {
                return fetch(characterLink).then((res) => res.json());
            })
        ).then((characterData) => {
            ul.innerHTML = "";
            characterData.forEach((ch) => {
                let li = document.createElement("li");
                li.innerText = `${ch.name}: ( ${ch.aliases} )`;
                ul.append(li);
            })

        })
    }


    function createUI(arr = [], rootElm) {
        rootElm.innerHTML = "";
        return arr.forEach((book) => {
            let div = document.createElement("div");
            div.className = "card";
            let h2 = document.createElement("h2");
            h2.innerText = book.name;
            let p = document.createElement("p");
            p.innerText = book.authors[0];
            let button = document.createElement("button");
            button.innerText = "Show More Characters";
            button.className = "show-button";
            button.addEventListener("click", () => handleCharactersButton(book.characters));
            let span = document.createElement("span");
            span.innerText = `(${book.characters.length})`;
            button.append(span);
            div.append(h2, p, button);
            rootElm.append(div);
        })
    }

    function fetchBooks() {
        handleSpinner(cardContainer, true);
        fetch(`https://www.anapioficeandfire.com/api/books`).then(function(res) {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Check Your Internet Connection");
            }
        }).then(function(arr) {
            handleSpinner(true);
            createUI(arr, cardContainer);
        }).catch((error) => cardContainer.innerHTML = error).finally(() => handleSpinner(cardContainer))
    }

    if (navigator.onLine) {
        fetchBooks();
    } else {
        let h6 = document.createElement("h6");
        h6.innerText = "Check Your Fucking Internet Connection!";
        h6.style.color = "red";
        h6.style.fontSize = "1.2rem";
        h6.style.fontWeight = "300";
        h6.className = "center";

        document.querySelector("main").append(h6);
    }


})();