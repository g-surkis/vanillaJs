let modals = new Map();
let deletedModals = new Map();

const body = document.getElementsByTagName("body")[0];
const btnOpen = document.getElementsByClassName("btn-open")[0];

const closeModal = node => () => {
  node.classList.add("modal-fadeout");
  setTimeout(() => {
    node.remove();
  }, 1000);
};

let modalsCount = 0;

const createModal = () => {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const header = document.createElement("div");
  header.textContent = "Modal window";
  header.classList.add("modal-header");

  const btnClose = document.createElement("button");
  btnClose.textContent = "Close";
  btnClose.classList.add("btn-close");
  btnClose.addEventListener("click", closeModal(modal));

  modal.append(header, btnClose);
  modalsCount++;
  return modal;
};

btnOpen.addEventListener("click", function() {
  const modal = createModal();
  const coordinate = `${modalsCount * 75}px`;
  modal.style.top = `${(modalsCount % 5) * 75}px`;
  modal.style.left = coordinate;

  body.append(modal);
});
