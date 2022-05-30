let input = document.querySelector("input");
let ul = document.querySelector("ul");


const url = `https://api.unsplash.com/photos/?client_id=14dYEizYGv6SkxJgaRoxLolh4u4b08dIJ9nN-vJCu84`;
const getSearchURL = (query) => {
    return `https://api.unsplash.com/search/photos?query=${query}&client_id=14dYEizYGv6SkxJgaRoxLolh4u4b08dIJ9nN-vJCu84`

}

function fetch(url, successHandler) {
    let xml = new XMLHttpRequest();
    xml.open("GET", url);
    xml.onload = () => {
        successHandler(JSON.parse(xml.response));
    }
    xml.send();
}

function displayImages(images) {
    ul.innerHTML = "";
    images.forEach((image) => {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = image.urls.thumb;
        li.append(img);
        ul.append(li);
    })
}

fetch(url, displayImages)

function handleSearch(e) {
    if (e.keyCode === 13 && input.value) {
        console.log(getSearchURL(input.value), input.value);
        fetch(getSearchURL(input.value), (searchResult) => {
            displayImages(searchResult.results);
        });
    }
}
input.addEventListener("keyup", handleSearch);

// 14dYEizYGv6SkxJgaRoxLolh4u4b08dIJ9nN-vJCu84