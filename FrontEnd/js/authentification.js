import { URL } from "./api.js";
const form = document.getElementById("form");
let obj;
const error = document.getElementById("error");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const prePayload = new FormData(form);

  const payload = new URLSearchParams(prePayload);
  console.log([...payload]);

  fetch(`${URL}/users/login`, {
    method: "POST",
    body: payload,
  })
    .then((res) => {
      if (res.status === 401 || res.status === 404) {
        error.innerText = "Erreur dans l’identifiant ou le mot de passe !";
        setTimeout(() => {
          error.innerText = "";
        }, 3000);
        return null;
      } else {
        return res.json();
      }
    })
    .then((data) => (obj = data))
    .then(() => sessionStorage.setItem("token", JSON.stringify(obj.token)))
    .catch((err) => console.log(err));
});

if (
  sessionStorage.getItem("token") != null ||
  sessionStorage.getItem("token") != undefined
) {
  location.replace("/FrontEnd/index.html");
}
