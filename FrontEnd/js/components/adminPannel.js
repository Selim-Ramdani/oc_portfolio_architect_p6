export const adminPannel = () => {
  const adminPannelEl = document.createElement('div');
  const adminPannelDivEl = document.createElement('div');
  adminPannelDivEl.setAttribute("id", "admin_pannel-content");
  const span = document.createElement('span');
  span.textContent="Vous êtes bien connecté en tant qu'administrateur";
  adminPannelDivEl.appendChild(span);
  const header = document.querySelectorAll("header");
  adminPannelEl.setAttribute("id", "admin_pannel");
  adminPannelEl.appendChild(adminPannelDivEl);
  document.body.insertBefore(adminPannelEl, document.getElementById("header"));
}