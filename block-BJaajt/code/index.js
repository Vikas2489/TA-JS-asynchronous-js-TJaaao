const input = document.querySelector("input");
const userImg = document.querySelector(".user-img");
const userName = document.querySelector(".userName");
const realName = document.querySelector(".real-name");

const followersArr = document.querySelectorAll(".followers");
const followingArr = document.querySelectorAll(".following");



input.addEventListener("keyup", (e) => {
    if (event.keyCode == 13) {
        let xml = new XMLHttpRequest();
        console.log(e.target.value);
        xml.open('GET', `https://api.github.com/users/${e.target.value}`)
        xml.onload = function() {
            let userData = JSON.parse(xml.response);
            userImg.src = userData.avatar_url;
            userName.innerText = e.target.value;
            realName.innerText = userData.name;

            let newXml = new XMLHttpRequest();
            newXml.open("GET", `https://api.github.com/users/${e.target.value}/followers`)

            newXml.onload = function() {
                let followers = newXml.response;
                let followers1 = JSON.parse(followers);
                for (let i = 0; i < 5; i++) {
                    followersArr[i].src = followers1[i].avatar_url;
                }
            }
            newXml.send();


            let newXml1 = new XMLHttpRequest();
            newXml1.open("GET", `https://api.github.com/users/${e.target.value}/following`);

            newXml1.onload = function() {
                let following = newXml1.response;
                let following1 = JSON.parse(following);
                for (let i = 0; i < 5; i++) {
                    followingArr[i].src = following1[i].avatar_url;
                }
            }
            newXml1.send();
        }
        xml.onerror = function() {
            console.log("OOPS, Something went wrong");
        }
        xml.send();
    }

})



// Random Cat pic

const button = document.querySelector("button");
const img = document.querySelector(".cat-img");
let imgXml;
button.addEventListener("click", function(event) {

    imgXml = new XMLHttpRequest();
    imgXml.open('GET', `https://api.thecatapi.com/v1/images/search`);
    imgXml.onload = function() {
        let v1 = imgXml.response;
        let randomImgLinkArr = JSON.parse(v1);
        img.src = randomImgLinkArr[0].url;
    }
    imgXml.send();
})