import { URL } from "./api.js";
const form = document.getElementById("form");
let obj;
const error = document.getElementById("error");

const login = async (data) => {
  const user = {
    email: data.get("email"),
    password: data.get("password"),
  };

  return await fetch(`${URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = new FormData(form);

  const response = await login(payload);
  const user = await response.json();
  console.log(response);
  console.log(user);

  if (response.status === 401 || response.status === 404) {
    error.innerText = "Erreur dans l’identifiant ou le mot de passe !";
    setTimeout(() => {
      error.innerText = "";
    }, 3000);
  }

  if (response.status === 200) {
    sessionStorage.setItem("user", JSON.stringify(user));
    window.location.assign("/FrontEnd/index.html");
  }

  //   fetch(`${URL}/users/login`, {
  //     method: "POST",
  //     body: payload,
  //   })
  //     .then((res) => {
  //       if (res.status === 401 || res.status === 404) {
  //         error.innerText = "Erreur dans l’identifiant ou le mot de passe !";
  //         setTimeout(() => {
  //           error.innerText = "";
  //         }, 3000);
  //         return null;
  //       } else {
  //         return res.json();
  //       }
  //     })
  //     .then((data) => (obj = data))
  //     .then(() => sessionStorage.setItem("token", JSON.stringify(obj.token)))
  //     .catch((err) => console.log(err));
});