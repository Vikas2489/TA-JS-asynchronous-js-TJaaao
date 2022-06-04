let cardContainer = document.querySelector(".card-cnt");
let charactersContainer = document.querySelector(".characters-cnt");

function handleSpinner(status) {
    if (status) {
        let div = document.createElement("div");
        div.className = "donut";
        cardContainer.append(div);
    }
}

let cancelButton = document.querySelector(".cancel");

cancelButton.addEventListener("click", (e) => {
    charactersContainer.classList.add("display-none");
})

function handleCharactersButton(arr) {
    return arr.forEach(function(characterLink) {
        fetch(characterLink).then((res) => {
            return res.json();
        }).then((character) => {
            let ul = document.querySelector("ul");
            let li = document.createElement("li");
            li.innerText = `${character.name}: (${character.aliases})`;
            ul.append(li);
            charactersContainer.append(ul);
            charactersContainer.classList.remove("display-none");
        });
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
        span.innerText = `(${book.numberOfPages})`;
        button.append(span);
        div.append(h2, p, button);
        rootElm.append(div);
    })
}

let promise = fetch(`https://www.anapioficeandfire.com/api/books`).then(function(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Check Your Internet Connection");
    }
}).then(function(arr) {
    handleSpinner(true);
    createUI(arr, cardContainer);
}).catch((error) => cardContainer.innerHTML = error);