let container = document.querySelector(".container");
let apiUrl = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
let select = document.querySelector("select");


function createUI(imageUrl, title, headline, readMoreLink) {
    let article = document.createElement("article");
    article.classList.add("flex");
    let div = document.createElement("div");
    div.classList.add("flex-45");
    let img = document.createElement("img");
    img.style.width = "100%";
    img.style.height = "100%";
    img.src = imageUrl;
    div.append(img);
    let div1 = document.createElement("div");
    div1.classList.add("flex-45");
    let h2 = document.createElement("h2");
    h2.innerText = title;
    let p = document.createElement("p");
    p.innerText = headline;
    let div3 = document.createElement("div");
    div3.classList.add("text-right");
    let a = document.createElement("a");
    a.href = readMoreLink;
    a.innerText = `Read More`;
    div3.append(a);
    div1.append(h2, p, div3);
    article.append(div, div1);

    container.append(article);
}

// function fetch(url) {
//     return new Promise((res, rej) => {
//         let xml = new XMLHttpRequest();
//         xml.open("GET", url);
//         xml.onloadstart = function() {
//             let h3 = document.createElement("h3");
//             h3.innerText = "still-loading";
//             container.append(h3);
//         };
//         xml.onloadend = function() {
//             container.removeChild(h3);
//         };
//         xml.send();
//     })
// }




let data = fetch(apiUrl).then((response) => {
    console.log(response);
    if (!response.ok) {
        throw new Error("Check Your Internet Connection.")
    }
    return response.json();
}).then(function forEachNews(arr) {
    arr.forEach((elm) => {
        createUI(elm.imageUrl, elm.newsSite, elm.title, elm.url);
    });

    select.addEventListener("change", (e) => {
        container.innerHTML = "";
        let value = e.target.value;
        if (value === "news") {
            forEachNews(arr);
        }
        let filteredArr = arr.filter((elm) => elm.newsSite === value);
        filteredArr.forEach((elm) => {
            createUI(elm.imageUrl, elm.newsSite, elm.title, elm.url);
        });

    })
}).catch((error) => {
    let h4 = document.createElement("h4");
    h4.innerText = error;
    h4.style.color = "red";
    container.append(h4);
});