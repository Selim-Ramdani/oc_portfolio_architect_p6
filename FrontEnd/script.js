/* ------------------------------------------
 *              Localisation des éléments du DOM dans des variables
 * ------------------------------------------
 * */

const gallery = document.querySelector(".gallery");
const filtersDiv = document.querySelector(".filters");
const BASE_URL = "http://localhost:5678/";
let arrWorks = [];
// Fetch works
const getData = async () => {
  console.log("%c getData function launched", "font-weight: bold;");
  const response = await fetch(`${BASE_URL}api/works`);
  const works = await response.json(); // Décodage JSON de la réponse
  arrWorks.push(...works);
  console.log(works);
  displayWorks(arrWorks);
};

function displayWorks(work) {
  work.map((item) => {
    const figure = document.createElement("figure");
    const imgWorks = item.imageUrl;
    const titleWorks = item.title;
    const images = document.createElement("img");
    const titles = document.createElement("figcaption");
    titles.innerText = titleWorks;
    images.src = imgWorks;
    gallery.appendChild(figure);
    figure.appendChild(images);
    figure.appendChild(titles);
  });
}

function displayCategories() {
  const displayAll = document.createElement("button");
  displayAll.innerText = "Tous";

  const displayObject = document.createElement("button");
  displayObject.innerText = "Objets";
  // displayObject.setAttribute("name", "Objets");
  console.log(displayObject.value);

  const displayAppartment = document.createElement("button");
  displayAppartment.innerText = "Appartements";

  const displayHotelRestaurant = document.createElement("button");
  displayHotelRestaurant.innerText = "Hotels & Restaurants";

  filtersDiv.append(displayAll);
  filtersDiv.append(displayObject);
  filtersDiv.append(displayAppartment);
  filtersDiv.append(displayHotelRestaurant);

  displayAll.addEventListener("click", () => {
    gallery.innerText = "";
    displayWorks(arrWorks);
  });

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

function init() {
  getData();
  displayCategories();
}
init();
