// src/scripts.ts
var postForm = document.querySelector(".postForm");
postForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const body = {
    title: e.target.elements.namedItem("title").value,
    author: e.target.elements.namedItem("author").value,
    content: e.target.elements.namedItem("content").value
  };
  fetch("/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then((res) => {
    if (res.redirected) {
      location.replace(res.url);
    }
    console.log(res.status);
  });
});
var userForm = document.querySelector(".userForm");
userForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const body = {
    name: e.target.elements.namedItem("name").value,
    email: e.target.elements.namedItem("email").value,
    password: e.target.elements.namedItem("password").value
  };
  fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then((res) => {
    if (res.redirected) {
      location.replace(res.url);
    }
  });
});
