import { urlApi } from "./js/api.js";
import { adminPannel } from "./js/components/adminPannel.js";
const gallery = document.querySelector(".gallery");
const filtersDiv = document.querySelector(".filters");

// Tableaux pour stocker des données (sources de vérité)
let arrWorks = [];
let arrCategories = [];

// Vérifier si l'utilisateur est connecté en récupérant les informations depuis sessionStorage
const isLogged = JSON.parse(sessionStorage.getItem("user")) || null;

const loginEl = document.getElementById("login");
loginEl.style.cursor = "pointer";
const blocAdmin = document.getElementById("blocAdmin");

const modalEl = document.createElement("div");
modalEl.className = "modal_container";


/** -------------------- getWorks
 * @return {Promise}
 * Fonction asynchrone qui effectue une requête GET pour récupérer les works du projet à partir de l'API.
 * 
*/
const getWorks = async () => {
  console.log("%c getWorks function launched", "font-weight: bold;");
  const response = await fetch(`${urlApi}/works`);
  console.log("Response: ", response);
  const works = await response.json(); // Décodage JSON de la réponse
  console.log("Works: ", works);
  arrWorks.push(...works);
  console.log(works);
};

/**
 * @return {Promise}
 * Fonction asynchrone qui effectue une requête GET pour récupérer les catégories du projet à partir de l'API.
 */
const getCategories = async () => {
  console.log("%c getCategories function launched", "font-weight: bold;");
  await fetch(`${urlApi}/categories`)
    .then((response) => response.json())
    .then((data) => arrCategories.push(...data));
};


/**
 * Affiche les works dans la galerie.
 *
 * @param {Array} work - Un tableau d'objets représentant les works à afficher.
 *   - id (number).
 *   - imageUrl (string).
 *   - title (string).
 */
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


/**
 * Crée les éléments de filtre pour les catégories à partir des works fournies.
 *
 * @param {Array} work
 *   - category (object)
 */
function createFilterElements(work) {
  // Crée un tableau contenant les noms des catégories à partir des wprls fournies
  const categories = work.map((item) => {
    return item.category.name;
  });
  // Copie les noms de catégories dans un nouvel array pour les rendre uniques
  let chars = categories;
  let uniqueCategory = [...new Set(categories)];
}


/**
 * Affiche les catégories sous forme de boutons et ajoute les événements de filtrage pour chaque catégorie.
 * Les filtres sont appliqués sur les works en fonction de leur 'categoryId'.
 */
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


/**
 * Gère l'affichage des filtres pour les catégories des works.
 * Crée les boutons de filtre pour chaque catégorie et les ajoute à l'interface utilisateur (UI).
 *
 * @param {Array} data - Les données des catégories works à afficher dans les filtres.
 *   - id (number).
 *   - name (string).
 */
const handleFilters = (data) => {
  // Crée un bouton de filtre spécial pour afficher toutes les catégories (catégorie "Tous").
  createFilter({ name: "Tous", id: 0 });

  // Parcourt chaque catégorie de données et crée un bouton de filtre pour chaque catégorie.
  data.forEach((filter) => {
    createFilter(filter);
  });
};


/**
 * Initialise les fonctions de l'application
 */
const init = async () => {
  await getWorks();
  await getCategories();
  displayWorks(arrWorks);
  createFilterElements(arrWorks);
  handleFilters(arrCategories);
  displayGalleryModal(arrWorks);
};
init();

let getToken = sessionStorage.getItem("user");
if (getToken != null) {
  loginEl.textContent = "logout";
  document.querySelector(".filters").style.display = "none";
}
loginEl.addEventListener("click", function () {
  sessionStorage.removeItem("user");
  window.location.reload();
});

const editBtn = document.getElementById("edit_btn");

if (isLogged !== null && isLogged.userId === 1) {
  // user with id 1 is connected
  document.getElementById("edit_bloc").style.display = "block";
  adminPannel();
}

editBtn.addEventListener("click", () => {
  openModal();
  document.getElementById("overlay").style.display = "block";
});

const openModal = () => {
  document.querySelector(".modal_container").style.display = "block";
  // createModalElements();
};


/**
 * Supprime un work du serveur : DELETE request.
 * @param {number} id - L'identifiant du work à supprimer.
 * @return {Promise<Response>} - Une promesse contenant la réponse de la requête à l'API.
 */
const deleteWork = async (id) => {
  try {
    const response = await fetch(`${urlApi}/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JSON.parse(getToken).token}`,
      },
    });
    if (response.ok) {
      const indexToDelete = arrWorks.findIndex((work) => work.id === id);
      if (indexToDelete !== -1) {
        arrWorks.splice(indexToDelete, 1); // Supprime l'élément du tableau arrWorks
      }

      // Mets à jour la galerie dans la modale
      const modalGalleryEl = document.getElementById("galleryModal");
      const imageToDel = modalGalleryEl.querySelector(`figure[data-id="${id}"]`);
      if (imageToDel) {
        imageToDel.remove();
      }

      // Mets à jour la galerie sur la page principale
      const gallery = document.querySelector(".gallery");
      const imageInGallery = gallery.querySelector(`figure[data-id="${id}"]`);
      if (imageInGallery) {
        imageInGallery.remove();
      }
    }
  } catch (error) {
    console.error(error);
  }
};



const displayGalleryModal = async () => {
  for (let i = 0; i < arrWorks.length; i++) {
    const figure = document.createElement("figure");
    let img = document.createElement("img");
    const modalGalleryEl = document.getElementById("galleryModal");
    const editIconsEl = document.createElement("div");
    const editTrashEl = document.createElement("i");
    editTrashEl.classList.add("fa-solid", "fa-trash-can", "trashIcon");
    editIconsEl.setAttribute("id", "modal-edit_icons");

    editTrashEl.addEventListener("click", async () => {
      try {
        const response = await deleteWork(arrWorks[i].id);
        if (response) {
          const imageToDel = document.querySelector(
            `figure[data-id="${arrWorks[i].id}"]`
          );
          console.log("Image to delete: ", imageToDel);
          if (imageToDel) {
            imageToDel.remove();
          }
        }
      } catch (error) {
        console.error(error);
      }
    });

    figure.setAttribute("data-id", arrWorks[i].id);
    img.setAttribute("src", arrWorks[i].imageUrl);
    img.setAttribute("id", "modal_img");
    modalGalleryEl.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(editTrashEl);
  }
};

const closeModal = () => {
  document.querySelector(".modal_container").style.display = "none";
  document.getElementById("overlay").style.display = "none";
};

const close = document.querySelector(".closeModal");
close.addEventListener("click", () => {
  closeModal();
});

const modal1 = document.getElementById("modal1");
const addPictureEl = document.getElementById("addPicture");
const modal2 = document.getElementById("modal2");
const imgDynamicEl = document.querySelector(".image");
const imgMainModal = document.createElement("img");
imgMainModal.setAttribute("id", "objectUrlImg");
imgDynamicEl.appendChild(imgMainModal);
const openAddPictureModal = () => {
  addPictureEl.addEventListener("click", () => {
    modal1.style.display = "none";
    modal2.style.display = "block";
  });
};
openAddPictureModal();

const closeAddPictureModal = () => {
  const closeAddPictureEl = document.querySelector("#modal2 .closeModal");
  closeAddPictureEl.addEventListener("click", () => {
    modal2.style.display = "none";
    document.getElementById("overlay").style.display = "none";
  });
};
closeAddPictureModal();

const backMainModal = () => {
  const backModalEl = document.querySelector(".backModal");
  backModalEl.addEventListener("click", () => {
    modal1.style.display = "block";
    modal2.style.display = "none";
  });
};
backMainModal();


// Upload Image

const uploadInputEl = document.getElementById("uploadInput");
const addImgBtn = document.getElementById("addImg");

addImgBtn.addEventListener("click", () => {
  uploadInputEl.click();
});

uploadInputEl.addEventListener("change", () => {
  console.log(uploadInputEl.files[0]);

  const url = URL.createObjectURL(uploadInputEl.files[0]);
  console.log(url);

  const imageUrlEl = document.getElementById("objectUrlImg");
  imageUrlEl.src = url;
  const iconImage = document.getElementById("iconImage").style.display = "none";
  const addImgEl = document.getElementById("addImg").style.display = "none";
  const typeImgEl = document.querySelector(".typeImg").style.display = "none";
});

const addWorkForm = document.getElementById('uploadImgForm');
addWorkForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(addWorkForm);
  console.log(formData);
  await addWork(formData);

  const iconImage = document.getElementById("iconImage").style.display = "block";
  const addImgEl = document.getElementById("addImg").style.display = "block";
  document.getElementById("objectUrlImg").removeAttribute("src");
  addWorkForm.reset(); // Réinitialise le formulaire après soumission
});


/**
 * Ajoute un nouveau work en envoyant les données de formData au serveur via une requête POST.
 * @param {FormData} formData - Les données du work à ajouter.
 */
const addWork = async (formData) => {

  const token = sessionStorage.getItem("user");
  try {
    const response = await fetch(`${urlApi}/works`, {
      method: 'post',
      body: formData,
      headers: {
        Authorization: `Bearer ${JSON.parse(token).token}`,
      }
    });
    const status = response.status;
    const work = await response.json();
    console.log(work);
    if (status === 400 || status === 404) {
      throw new Error("Echec de la connexion au serveur. Veuillez réessayer.");
    }
    else {
      document.querySelector("#galleryModal").innerHTML = '';
      document.querySelector(".gallery").innerHTML = "";
      arrWorks.push(work);
      closeAddPictureModal();
      displayGalleryModal(arrWorks);
      displayWorks(arrWorks);
    }

  } catch (e) {
    console.error(e);
  }
};