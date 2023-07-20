let arrWorks = [];

export const displayGalleryModal = async () => {
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

export const closeModal = () => {
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
export const openAddPictureModal = () => {
  addPictureEl.addEventListener("click", () => {
    modal1.style.display = "none";
    modal2.style.display = "block";
  });
};
openAddPictureModal();

export const closeAddPictureModal = () => {
  const closeAddPictureEl = document.querySelector("#modal2 .closeModal");
  closeAddPictureEl.addEventListener("click", () => {
    modal2.style.display = "none";
    document.getElementById("overlay").style.display = "none";
  });
};
closeAddPictureModal();

export const backMainModal = () => {
  const backModalEl = document.querySelector(".backModal");
  backModalEl.addEventListener("click", () => {
    modal1.style.display = "block";
    modal2.style.display = "none";
  });
};
backMainModal();

const editBtn = document.getElementById("edit_btn");
editBtn.addEventListener("click", () => {
  openModal();
  document.getElementById("overlay").style.display = "block";
});

const openModal = () => {
  document.querySelector(".modal_container").style.display = "block";
  // createModalElements();
};
