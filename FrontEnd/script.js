import { urlApi } from "./js/api.js";
import { adminPannel } from "./js/components/adminPannel.js";
const gallery = document.querySelector(".gallery");
const filtersDiv = document.querySelector(".filters");

let arrWorks = [];
let arrCategories = [];
const isLogged = JSON.parse(sessionStorage.getItem("user")) || null;

// const isLogged = sessionStorage.getItem("token") || null;
const loginEl = document.getElementById("login");
loginEl.style.cursor = "pointer";
const blocAdmin = document.getElementById("blocAdmin");

const modalEl = document.createElement("div");
modalEl.className = "modal_container";

// Fetch works

const getWorks = async () => {
  console.log("%c getWorks function launched", "font-weight: bold;");
  const response = await fetch(`${urlApi}/works`);
  const works = await response.json(); // Décodage JSON de la réponse
  arrWorks.push(...works);
  console.log(works);
};

const getCategories = async () => {
  await fetch(`${urlApi}/categories`)
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
  displayWorks(arrWorks);
  createFilterElements(arrWorks);
  handleFilters(arrCategories);
  displayGalleryModal(arrWorks);
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

const deleteWork = async (id) => {
  return await fetch(`${urlApi}/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${JSON.parse(getToken).token}`,
    },
  });
};

const updateWorksUI = async () => {
  const arrWorks = [];
  await displayWorks(arrWorks);
  await displayGalleryModal();
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
      const response = await deleteWork(arrWorks[i].id);
      console.log("Response: ", response);
      if (response.ok) {
        const imageToDel = document.querySelector(
          `figure[data-id="${arrWorks[i].id}"]`
        );
        console.log("Image to delete: ", imageToDel);
        const imageGalleryToDel = document.querySelectorAll("figure");
        const imageGalleryToDelArr = [];
        imageGalleryToDelArr.push(imageGalleryToDelArr)
        console.log("Image gallery: ", imageGalleryToDelArr);
        imageGalleryToDelArr.remove();
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
uploadInputEl.addEventListener("change", () => {
  console.log(uploadInputEl.files[0]);

  const url = URL.createObjectURL(uploadInputEl.files[0]);
  console.log(url);

  const imageUrlEl = document.getElementById("objectUrlImg");
  imageUrlEl.src=url;
  const iconImage = document.getElementById("iconImage").style.display="none";
  const addImgEl = document.querySelector(".addImg").style.display="none";
  const typeImgEl = document.querySelector(".typeImg").style.display="none";

  const formData = new FormData();
  formData.append("image", imageUrlEl);
  let getToken = sessionStorage.getItem("user");
})

const formEl = document.getElementById('uploadImgForm');
 
formEl.addEventListener('submit', function (e) {
    e.preventDefault();
 
    const formData = new FormData(formEl);
    console.log(formData);
    addWork(formData);
});

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
            console.log(arrWorks);
            closeAddPictureModal();
            displayGalleryModal(arrWorks);
            displayWorks(arrWorks);
        }

    } catch (e) {
        console.error(e);
    }
};