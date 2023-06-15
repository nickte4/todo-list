import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/components/todo.css";
import "../styles/utils.css";

const form = document.getElementById("todo__form");
const listChange = 3.5;
setCurrHeight();
retrieveListItems();

function setNumItems(numItems) {
  window.localStorage.setItem("numItems", numItems);
}

function getNumItems() {
  if (!window.localStorage.getItem("numItems")) {
    window.localStorage.setItem("numItems", "0");
  }
  return parseInt(window.localStorage.getItem("numItems"));
}

function retrieveListItems() {
  let numItems = getNumItems();
  for (let i = 0; i < numItems; i++) {
    createListElement(JSON.parse(window.localStorage.getItem(i)));
  }
}

function getListHeight() {
  let listHeight = parseFloat(window.localStorage.getItem("listHeight"));
  return listHeight;
}

function setCurrHeight() {
  if (!window.localStorage.getItem("listHeight")) {
    window.localStorage.setItem("listHeight", "20");
  }
  let listHeight = window.localStorage.getItem("listHeight");
  let todo_box = document.getElementById("todo__box");
  todo_box.style.height = "20rem";
  todo_box.style.height = listHeight + "rem";
}

function storeListItem(li) {
  let text = li.getElementsByTagName("label")[0].textContent;
  let textObj = {
    value: text,
  };
  let numItems = getNumItems();
  window.localStorage.setItem(numItems, JSON.stringify(textObj));
}

// increments the list height depending on if an item is added or deleted
function incrementListHeight() {
  let todo_box = document.getElementById("todo__box");
  let listHeight = getListHeight() + listChange;
  todo_box.style.height = listHeight + "rem";
  window.localStorage.setItem("listHeight", listHeight);
}

// decrements the list height depending on if an item is added or deleted
function decrementListHeight() {
  let todo_box = document.getElementById("todo__box");
  let listHeight = getListHeight() - listChange;
  todo_box.style.height = listHeight + "rem";
  window.localStorage.setItem("listHeight", listHeight);
}

// creates the bubble to check off item
function createCheckButton(li) {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo__checkbox";
  li.appendChild(checkbox);
}

// creates a delete button to right of list item;
function createDelButton(li) {
  // create del tag
  let del = document.createElement("button");
  del.className = "todo__del";
  // create icon tag
  let icon = document.createElement("i");
  icon.className = "fa-solid fa-x";
  del.appendChild(icon);
  // listen for delete click
  del.addEventListener("click", () => {
    li.remove();
    decrementListHeight();
  });
  li.appendChild(del);
}

// creates text for list item
function createTextItem(li, input) {
  let text = document.createElement("label");
  text.appendChild(document.createTextNode(input.value));
  li.appendChild(text);
}

// creates the list item
function createListItem(li, input) {
  createCheckButton(li);
  createTextItem(li, input);
  createDelButton(li);
  storeListItem(li);
  setNumItems(getNumItems() + 1);
}

// creates the actual list item in ul tag
function createListElement(input) {
  let li = document.createElement("li");
  const ul = document.getElementById("todo__items");
  createListItem(li, input);
  ul.appendChild(li);
  incrementListHeight();
}

// adds the list if input is non-empty
function addListAfterClick(input) {
  if (input.value.length > 0) {
    createListElement(input);
  }
}

// listens for the actual 'add' or 'enter' button press
form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevents form from auto-submitting

  let input = document.getElementById("todo__task");
  addListAfterClick(input);

  input.value = ""; // clears task name after submitting
});
