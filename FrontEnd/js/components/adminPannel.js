export const adminPannel = () => {
  const adminPannelEl = document.createElement('div');
  const adminPannelDivEl = document.createElement('div');
  adminPannelDivEl.setAttribute("id", "adminPannel-content");
  const editionModeEl = document.createElement('span');
  editionModeEl.setAttribute("id", "editionMode");
  const publishChangesEl = document.createElement('button');
  publishChangesEl.setAttribute("id", "publishChanges");
  editionModeEl.innerHTML="<i class='fa-regular fa-pen-to-square'></i>Mode édition";
  publishChangesEl.textContent="publier les changements"
  adminPannelDivEl.appendChild(editionModeEl);
  adminPannelDivEl.appendChild(publishChangesEl);
  const header = document.querySelectorAll("header");
  adminPannelEl.setAttribute("id", "adminPannel");
  adminPannelEl.appendChild(adminPannelDivEl);
  document.body.insertBefore(adminPannelEl, document.getElementById("header"));
}