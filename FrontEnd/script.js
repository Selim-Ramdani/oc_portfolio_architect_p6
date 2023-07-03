import { URL } from "./js/api.js";
const gallery = document.querySelector(".gallery");
const filtersDiv = document.querySelector(".filters");

let arrWorks = [];
let arrCategories = [];
const isLogged = JSON.parse(sessionStorage.getItem("user")) || null;

// const isLogged = sessionStorage.getItem("token") || null;
const loginEl = document.getElementById("login");

const blocAdmin = document.getElementById("bloc_admin");
const editBtn = document.createElement("span");
editBtn.className = "edit_btn";

const modalEl = document.createElement("div");
modalEl.className = "modal_container";

blocAdmin.appendChild(editBtn);
// Fetch works
const getWorks = async () => {
  console.log("%c getWorks function launched", "font-weight: bold;");
  const response = await fetch(`${URL}/works`);
  const works = await response.json(); // Décodage JSON de la réponse
  arrWorks.push(...works);
  console.log(works);
  displayWorks(arrWorks);
  createFilterElements(arrWorks);
};

const getCategories = async () => {
  await fetch(`${URL}/categories`)
    .then((response) => response.json())
    .then((data) => arrCategories.push(...data));
};

function displayWorks(work) {
  work.map((item) => {
    const figure = document.createElement("figure");
    const imgWorks = item.imageUrl;
    const titleWorks = item.title;
    const images = document.createElement("img");
    const titles = document.createElement("figcaption");
    figure.setAttribute("data-id", item.id);
    titles.innerText = titleWorks;
    images.src = imgWorks;
    gallery.appendChild(figure);
    figure.appendChild(images);
    figure.appendChild(titles);
  });
}

function createFilterElements(work) {
  const categories = work.map((item) => {
    return item.category.name;
  });
  let chars = categories;
  let uniqueCategory = [...new Set(categories)];
}

function displayCategories() {
  const displayObject = document.createElement("button");
  displayObject.innerText = "Objets";
  displayObject.setAttribute("name", "Objets");
  console.log(displayObject.value);

  const displayAppartment = document.createElement("button");
  displayAppartment.innerText = "Appartements";

  const displayHotelRestaurant = document.createElement("button");
  displayHotelRestaurant.innerText = "Hotels & Restaurants";

  filtersDiv.append(displayObject);
  filtersDiv.append(displayAppartment);
  filtersDiv.append(displayHotelRestaurant);

  displayObject.addEventListener("click", () => {
    const filterObjects = arrWorks.filter((arrWorks) => {
      return arrWorks.categoryId === 1;
    });
    gallery.innerText = "";
    displayWorks(filterObjects);
  });

  displayAppartment.addEventListener("click", () => {
    const filterAppartments = arrWorks.filter((arrWorks) => {
      return arrWorks.categoryId === 2;
    });
    gallery.innerText = "";
    displayWorks(filterAppartments);
  });

  displayHotelRestaurant.addEventListener("click", () => {
    const filterHotelRestaurant = arrWorks.filter((arrWorks) => {
      return arrWorks.categoryId === 3;
    });
    gallery.innerText = "";
    displayWorks(filterHotelRestaurant);
  });
}

const createFilter = (data) => {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = data.name;
  buttonElement.name = data.id;

  if (data.id === 0) {
    buttonElement.classList.add("active");
  }

  buttonElement.addEventListener("click", () => {
    const allFilters = document.querySelectorAll(".filters button");
    allFilters.forEach((filter) => {
      filter.classList.remove("active");
    });
    buttonElement.classList.add("active");
    if (data.id === 0) {
      gallery.innerHTML = "";
      return displayWorks(arrWorks);
    }

    const filterHotelRestaurant = arrWorks.filter((work) => {
      return work.categoryId === data.id;
    });
    gallery.innerText = "";
    displayWorks(filterHotelRestaurant);
  });

  filtersDiv.appendChild(buttonElement);
};

const handleFilters = (data) => {
  createFilter({ name: "Tous", id: 0 });

  data.forEach((filter) => {
    createFilter(filter);
  });
};

const init = async () => {
  await getWorks();
  await getCategories();
  console.log(arrCategories);
  handleFilters(arrCategories);
};
init();

let getToken = sessionStorage.getItem("user");
if (getToken != null) {
  loginEl.textContent = "déconnexion";
}
loginEl.addEventListener("click", function () {
  sessionStorage.removeItem("user");
  window.location.reload();
});

if (isLogged !== null && isLogged.userId === 1) {
  // user with id 1 is connected
}
