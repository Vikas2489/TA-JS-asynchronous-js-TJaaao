let container = document.querySelector(".container");
let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
let select = document.querySelector("select");

{
    /* <article class="flex">
    <div class="flex-45">
        <img width="100%" height="50%" src="./img1.jpeg">
    </div>
    <div class="flex-45">
        <h2>NASA</h2>
        <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. provident, veniam reprehenderit atque possimus.
        </p>
        <div class="text-right">
            <a href="#">Read More</a>
        </div>
    </div>
    </article> */
}


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


let data = fetch(url).then((response) => {
    return response.json();
}).then(function(arr) {
    arr.forEach((elm) => {
        createUI(elm.imageUrl, elm.newsSite, elm.title, elm.url);
    });


    select.addEventListener("change", (e) => {
        container.innerHTML = "";
        let value = e.target.value;
        let filteredArr = arr.filter((elm) => elm.newsSite === value);
        filteredArr.forEach((elm) => {

            createUI(elm.imageUrl, elm.newsSite, elm.title, elm.url);
        });

    })
})