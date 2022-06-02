- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

```js
const one = new Promise((res, rej) =>
  setTimeout(function () {
    res('one');
  }, 1000)
);

const two = new Promise((res, rej) =>
  setTimeout(function () {
    res('two');
  }, 2000)
);

const three = new Promise((res, rej) =>
  setTimeout(function () {
    res('three');
  }, 3000)
);

const four = new Promise((res, rej) =>
  setTimeout(function () {
    res('four');
  }, 4000)
);
let allPromise = Promise.all([one, two, three, four]);
```

- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

```js
let dataArr = ['getify', 'nnnkit', 'prank7', 'radhika', 'vikas2489'];

let allPromises = Promise.all(
  dataArr.map((user) => {
    return fetch(`https://api.github.com/users/${user}`)
      .then((res) => res.json())
      .then((res) => res);
  })
).then((res) =>
  res.forEach(function (elm) {
    console.log(elm.followers);
  })
);
```

- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow

```js
let allUrl = [`https://random.dog/woof.json`, `https://aws.random.cat/meow`];

let racePromise = Promise.race(
  allUrl.map(function (url) {
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then((res) => console.log(res));
  })
);
```

- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

let settledPromise = Promise.allSettled([one, two, three]);
let promiseOfAll = Promise.all([one, two, three]);
```

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);

// ["Arya","sam",{ name: 'John' }]; after 2002ms
```
