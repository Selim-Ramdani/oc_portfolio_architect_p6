// import { urlApi } from "./api.js";
// import { displayGalleryModal } from "./modal.js";
// let arrWorks = [];
// let arrCategories = [];

// const gallery = document.querySelector(".gallery");
// const filtersDiv = document.querySelector(".filters");

// export const getWorks = async () => {
//   console.log("%c getWorks function launched", "font-weight: bold;");
//   const response = await fetch(`${urlApi}/works`);
//   const works = await response.json(); // Décodage JSON de la réponse
//   arrWorks.push(...works);
//   console.log(works);
// };

// export function displayWorks(work) {
//   work.map((item) => {
//     const figure = document.createElement("figure");
//     const imgWorks = item.imageUrl;
//     const titleWorks = item.title;
//     const images = document.createElement("img");
//     const titles = document.createElement("figcaption");
//     figure.setAttribute("data-id", item.id);
//     titles.innerText = titleWorks;
//     images.src = imgWorks;
//     gallery.appendChild(figure);
//     figure.appendChild(images);
//     figure.appendChild(titles);
//   });
// }

// export const getCategories = async () => {
//   await fetch(`${urlApi}/categories`)
//     .then((response) => response.json())
//     .then((data) => arrCategories.push(...data));
// };

// function createFilterElements(work) {
//   const categories = work.map((item) => {
//     return item.category.name;
//   });
//   let chars = categories;
//   let uniqueCategory = [...new Set(categories)];
// }

// function displayCategories() {
//   const displayObject = document.createElement("button");
//   displayObject.innerText = "Objets";
//   displayObject.setAttribute("name", "Objets");
//   console.log(displayObject.value);

//   const displayAppartment = document.createElement("button");
//   displayAppartment.innerText = "Appartements";

//   const displayHotelRestaurant = document.createElement("button");
//   displayHotelRestaurant.innerText = "Hotels & Restaurants";

//   filtersDiv.append(displayObject);
//   filtersDiv.append(displayAppartment);
//   filtersDiv.append(displayHotelRestaurant);

//   displayObject.addEventListener("click", () => {
//     const filterObjects = arrWorks.filter((arrWorks) => {
//       return arrWorks.categoryId === 1;
//     });
//     gallery.innerText = "";
//     displayWorks(filterObjects);
//   });

//   displayAppartment.addEventListener("click", () => {
//     const filterAppartments = arrWorks.filter((arrWorks) => {
//       return arrWorks.categoryId === 2;
//     });
//     gallery.innerText = "";
//     displayWorks(filterAppartments);
//   });

//   displayHotelRestaurant.addEventListener("click", () => {
//     const filterHotelRestaurant = arrWorks.filter((arrWorks) => {
//       return arrWorks.categoryId === 3;
//     });
//     gallery.innerText = "";
//     displayWorks(filterHotelRestaurant);
//   });
// }

// const createFilter = (data) => {
//   const buttonElement = document.createElement("button");
//   buttonElement.textContent = data.name;
//   buttonElement.name = data.id;

//   if (data.id === 0) {
//     buttonElement.classList.add("active");
//   }

//   buttonElement.addEventListener("click", () => {
//     const allFilters = document.querySelectorAll(".filters button");
//     allFilters.forEach((filter) => {
//       filter.classList.remove("active");
//     });
//     buttonElement.classList.add("active");
//     if (data.id === 0) {
//       gallery.innerHTML = "";
//       return displayWorks(arrWorks);
//     }

//     const filterHotelRestaurant = arrWorks.filter((work) => {
//       return work.categoryId === data.id;
//     });
//     gallery.innerText = "";
//     displayWorks(filterHotelRestaurant);
//   });

//   filtersDiv.appendChild(buttonElement);
// };

// const handleFilters = (data) => {
//   createFilter({ name: "Tous", id: 0 });

//   data.forEach((filter) => {
//     createFilter(filter);
//   });
// };

// const init = async () => {
//   await getWorks();
//   await getCategories();
//   displayWorks(arrWorks);
//   createFilterElements(arrWorks);
//   handleFilters(arrCategories);
//   displayGalleryModal(arrWorks);
// };
// init();