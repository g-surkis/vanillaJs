let tableState = 1;
let isModalOpen = false;
let highlightedRows = 0;

const body = document.getElementsByTagName("body")[0];
const table = document.getElementsByTagName("table")[0];

const addUserBtn = document.getElementsByClassName("add-user")[0];
const warning = document.createElement("span");
warning.textContent = "Email is not valid";
warning.classList.add("warning");

const form = document.getElementById("form-add-user");
form.addEventListener("submit", event => {
  event.preventDefault();
});

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.classList.add("delete-btn");
deleteBtn.addEventListener("click", () => {
  [...table.children].forEach(el => {
    if (el.classList.contains("highlighted")) {
      el.remove();
    }
  });
  highlightedRows = 0;
  deleteBtn.remove();
});

createForm = object => {
  const editForm = document.createElement("form");
  editForm.setAttribute("id", "edit-form");
  editForm.addEventListener("submit", event => {
    event.preventDefault();
  });
  editForm.classList.add("edit-form");
  Object.keys(object).forEach(el => {
    const input = document.createElement("input");
    input.setAttribute("name", el);
    input.setAttribute("placeholder", el);
    input.setAttribute("value", object[el]);
    editForm.append(input);
  });
  return editForm;
};

const deleteBtnActions = action => {
  if (action === "add") body.append(deleteBtn);
  if (action === "remove") deleteBtn.remove();
};

const createEditForm = (object, editableRaw, editFormRaw) => {
  const editForm = createForm(object);

  const updateBtn = document.createElement("button");
  updateBtn.textContent = "Update";
  updateBtn.addEventListener("click", () => {
    const inputs = editForm.elements;
    editableRaw.children[1].textContent = inputs[0].value;
    editableRaw.children[2].textContent = inputs[1].value;
    editableRaw.children[3].textContent = inputs[2].value;
    editFormRaw.remove();
    isModalOpen = false;
  });
  editForm.append(updateBtn);
  return editForm;
};

menageHighlightRow = target => {
  if (target.parentElement.classList.contains("highlighted")) {
    target.parentElement.classList.remove("highlighted");
    if (highlightedRows === 1) {
      deleteBtnActions("remove");
    }
    highlightedRows--;
  } else {
    target.parentElement.classList.add("highlighted");
    if (highlightedRows === 0) {
      deleteBtnActions("add");
    }
    highlightedRows++;
  }
};

table.addEventListener("click", event => {
  const { target } = event;

  if (target.id.search("edit") !== -1 && !isModalOpen) {
    isModalOpen = true;
    const editFormRaw = document.createElement("div");
    editFormRaw.classList.add("edit-raw");

    const editableRaw = document.getElementById(target.id).parentElement
      .parentElement;

    let editData = {
      Name: "",
      Surname: "",
      Email: ""
    };
    const keys = Object.keys(editData);
    [...editableRaw.children].slice(1, 4).forEach((el, i) => {
      editData[keys[i]] = el.textContent;
    });
    editFormRaw.append(createEditForm(editData, editableRaw, editFormRaw));
    editableRaw.after(editFormRaw);
  } else if (target.parentElement.id.search("raw") !== -1) {
    menageHighlightRow(target);
  }
});

const createCeil = value => {
  const ceil = document.createElement("td");
  ceil.textContent = value;
  return ceil;
};

const createBtnCeil = num => {
  const ceil = document.createElement("td");
  const btn = document.createElement("button");
  btn.textContent = "Edit";
  btn.setAttribute("id", `edit${tableState}`);
  ceil.append(btn);
  return ceil;
};

const createRaw = object => {
  const raw = document.createElement("tr");
  raw.setAttribute("id", `raw${tableState}`);
  raw.append(createCeil(tableState++));
  Object.keys(object).forEach(el => {
    raw.append(createCeil(object[el]));
  });
  raw.append(createBtnCeil(tableState));
  return raw;
};

const getDate = () => new Date().toJSON().slice(0, 10);

const validateEmail = email => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const addUser = () => {
  const inputs = form.elements;
  let userObject = {};
  [...inputs].slice(0, 3).forEach(element => {
    userObject[element.name] = element.value;
  });
  userObject.Date = getDate();
  if (!validateEmail(userObject.Email)) {
    form.append(warning);
    return;
  } else {
    warning.remove();
  }
  table.append(createRaw(userObject));
};

addUserBtn.addEventListener("click", addUser);
