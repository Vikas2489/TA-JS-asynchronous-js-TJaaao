let container = document.querySelector("container");
// let promise = fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`);

// promise.then((data) => {
//     return data.url;
// }).then(function(url) {
//     return url;
// });

function fetchData(url) {
    return new Promise((res, rej) => {
        let xml = new XMLHttpRequest();
        xml.open("GET", url);
        xml.onload = function() {
            res(url);
        }
        xml.onerror = function() {
            rej(url);
        }
        xml.send();
    });
}

let data = fetchData(`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`).then((response) => {
    console.log(response);
});