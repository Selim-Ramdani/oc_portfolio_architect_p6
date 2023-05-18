/* ------------------------------------------
 *              Localisation des éléments du DOM dans des variables
 * ------------------------------------------
 * */

const gallery = document.querySelector(".gallery");

const BASE_URL = "http://localhost:5678/";
let arrWorks = [];
// Fetch works
const getWorks = async () => {
  console.log("%c getWorks function launched", "font-weight: bold;");
  const response = await fetch(`${BASE_URL}api/works`);
  const works = await response.json(); // Décodage JSON de la réponse
  arrWorks.push(...works);
  console.log(works);
  createWorksEl(arrWorks);
};
function createWorksEl(work) {
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

function init() {
  getWorks();
}
init();
