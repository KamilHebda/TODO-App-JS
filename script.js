let TODOINPUT;
let TODOTEXTAREA;
let TODODATE;
let ADDBTN;
let FORMSALERT;
let ALERTINFO;
let ULLIST;
let NEWTASK;
let NEWTASKTEXTAREA = [];
let NEWTASKDATE = [];
let NEWTASKSETDATE = [];
let ALLTASKS;
let ID = 0;
let CURRENTID;
let DETAILS;
let DETAILSCONTAINER;
let DETAILSTODO;
let POPUP;
let EDITEDTODO;
let POPUPINPUT;
let POPUPTEXTAREA;
let POPUPINFO;
let ADDPOPUPBTN;
let CLOSEPOPUPBTN;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  TODOINPUT = document.querySelector(".todo__header-title");
  TODOTEXTAREA = document.querySelector(".todo__header-details");
  TODODATE = document.querySelector(".todo__header-date");
  ADDBTN = document.querySelector(".todo__header--add-btn");
  FORMSALERT = document.querySelector(".todo__header-alert");
  ALERTINFO = document.querySelector(".todo-list__alert-info");
  ULLIST = document.querySelector(".todo-list__list");
  ALLTASKS = document.getElementsByTagName("li");
  DETAILS = document.querySelector(".details");
  POPUP = document.querySelector(".popup-shadow");
  POPUPINPUT = document.querySelector(".popup__body-input");
  POPUPTEXTAREA = document.querySelector(".popup__body-details");
  POPUPDATE = document.querySelector(".new-finish-date");
  POPUPINFO = document.querySelector(".popup__body-info");
  ADDPOPUPBTN = document.querySelector(".popup__body-btn--accept");
  CLOSEPOPUPBTN = document.querySelector(".popup__body-btn--cancel");
};

const prepareDOMEvents = () => {
  ADDBTN.addEventListener("click", addNewTask);
  ULLIST.addEventListener("click", checkClick);
  ADDPOPUPBTN.addEventListener("click", changeToDo);
  CLOSEPOPUPBTN.addEventListener("click", closePopup);
  DETAILS.addEventListener("click", checkTaskDetails);
};

const addNewTask = () => {
  if (
    TODOINPUT.value !== "" &&
    TODOTEXTAREA.value !== "" &&
    TODODATE.value !== ""
  ) {
    NEWTASK = document.createElement("li");
    NEWTASK.innerText = TODOINPUT.value;
    NEWTASK.setAttribute("id", ID);
    NEWTASKTEXTAREA.push(TODOTEXTAREA.value);
    NEWTASKDATE.push(TODODATE.value);
    NEWTASKSETDATE.push(new Date().toISOString().slice(0, 10));
    ULLIST.appendChild(NEWTASK);
    createToolsArea();

    TODOINPUT.value = "";
    TODOTEXTAREA.value = "";
    TODODATE.value = "";
    ALERTINFO.innerText = "";
    FORMSALERT.style.visibility = "hidden";
    ID++;
  } else {
    FORMSALERT.style.visibility = "visible";
  }
};

const createToolsArea = () => {
  const toolsPanel = document.createElement("div");
  toolsPanel.classList.add("tools");
  NEWTASK.appendChild(toolsPanel);

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("tools__complete");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';

  const editBtn = document.createElement("button");
  editBtn.classList.add("tools__edit");
  editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

  const detailsBtn = document.createElement("button");
  detailsBtn.classList.add("tools__details");
  detailsBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("tools__delete");
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  toolsPanel.appendChild(completeBtn);
  toolsPanel.appendChild(editBtn);
  toolsPanel.appendChild(detailsBtn);
  toolsPanel.appendChild(deleteBtn);
};

const checkClick = (e) => {
  if (e.target.classList.value !== "") {
    if (e.target.closest("button").classList.contains("tools__complete")) {
      e.target.closest("li").classList.toggle("completed");
      e.target.closest("button").classList.toggle("completed");
    } else if (e.target.closest("button").classList.contains("tools__edit")) {
      editTask(e);
    } else if (
      e.target.closest("button").classList.contains("tools__details")
    ) {
      displayTask(e);
    } else if (e.target.closest("button").classList.contains("tools__delete")) {
      deleteTask(e);
    }
  }
};

const editTask = (e) => {
  CURRENTID = e.target.closest("li").id;
  EDITEDTODO = document.getElementById(CURRENTID);
  POPUPINPUT.value = EDITEDTODO.firstChild.textContent;
  POPUPTEXTAREA.value = NEWTASKTEXTAREA[CURRENTID];
  POPUPDATE.value = NEWTASKDATE[CURRENTID];

  POPUP.style.display = "flex";
};

const changeToDo = () => {
  if (
    POPUPINPUT.value !== "" &&
    POPUPTEXTAREA.value !== "" &&
    POPUPDATE.value !== ""
  ) {
    EDITEDTODO.firstChild.textContent = POPUPINPUT.value;
    NEWTASKTEXTAREA[CURRENTID] = POPUPTEXTAREA.value;
    NEWTASKDATE[CURRENTID] = POPUPDATE.value;
    POPUP.style.display = "none";
    POPUPINFO.style.visibility = "hidden";
  } else {
    POPUPINFO.style.visibility = "visible";
  }
};

const displayTask = (e) => {
  CURRENTID = e.target.closest("li").id;
  DETAILSTODO = document.getElementById(CURRENTID);
  DETAILSCONTAINER = document.createElement("div");
  DETAILSCONTAINER.classList.add("details__container");
  DETAILS.appendChild(DETAILSCONTAINER);
  DETAILSCONTAINER.innerHTML = `<h1>Nazwa zadania: ${DETAILSTODO.firstChild.textContent}</h1>
        <p>Szczegóły: ${NEWTASKTEXTAREA[CURRENTID]}</p>
        <h3>Data wprowadzenia zadania:</h2>
        <p>${NEWTASKSETDATE[CURRENTID]}</p>
        <h3>Data zakończenia zadania:</h2>
        <p>${NEWTASKDATE[CURRENTID]}</p>
        <button class="close__details">Zamknij</button>`;
};

const deleteTask = (e) => {
  const deleteToDo = e.target.closest("li");
  deleteToDo.remove();
  DETAILSCONTAINER.remove();

  if (ALLTASKS.length === 0) {
    ALERTINFO.innerText = "Brak zadań na liście";
  }
};

const closePopup = () => {
  POPUP.style.display = "none";
  POPUPINFO.style.visibility = "hidden";
};

const closeTaskDetails = (e) => {
  const closeTODODetails = e.target.closest("div");
  closeTODODetails.remove();
};

const checkTaskDetails = (e) => {
  if (e.target.classList.value !== "") {
    if (e.target.closest("button").classList.contains("close__details")) {
      closeTaskDetails(e);
    }
  }
};

document.addEventListener("DOMContentLoaded", main);
