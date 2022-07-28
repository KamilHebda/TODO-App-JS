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
let DETAILS;
let POPUP;
let EDITEDTODO;
let POPUPINPUT;
let POPUPTEXTAREA;
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
  ADDPOPUPBTN = document.querySelector(".popup__body-btn--accept");
  CLOSEPOPUPBTN = document.querySelector(".popup__body-btn--cancel");
};

const prepareDOMEvents = () => {
  ADDBTN.addEventListener("click", addNewTask);
  ULLIST.addEventListener("click", checkClick);
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
    NEWTASKSETDATE.push(new Date());
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

const deleteTask = (e) => {
  const deleteToDo = e.target.closest("li");
  deleteToDo.remove();

  if (ALLTASKS.length === 0) {
    ALERTINFO.innerText = "Brak zadań na liście";
  }
};

const editTask = (e) => {
  const oldToDo = e.target.closest("li").id;
  EDITEDTODO = document.getElementById(oldToDo);
  POPUPINPUT.value = EDITEDTODO.firstChild.textContent;
  POPUPTEXTAREA.value = NEWTASKTEXTAREA[oldToDo];
  POPUPDATE.value = NEWTASKDATE[oldToDo];

  POPUP.style.display = "flex";
};

const displayTask = (e) => {};

document.addEventListener("DOMContentLoaded", main);
