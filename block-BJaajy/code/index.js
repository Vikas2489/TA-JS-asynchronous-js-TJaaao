let allUrl = [`https://random.dog/woof.json`, `https://aws.random.cat/meow`];

allUrl.forEach(function(url) {
    fetch(url).then(function(response) {
        return response.json();
    }).then((res) => console.log(res));
})