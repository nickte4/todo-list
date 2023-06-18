import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/components/todo.css";
import "../styles/utils.css";

const form = document.getElementById("todo__form");
const listChange = 3.5;
let currListHeight = 20;
retrieveListItems();

function setItemId(itemId) {
  window.localStorage.setItem("itemId", itemId);
}

function getItemId() {
  if (!Number(window.localStorage.getItem("itemId"))) {
    window.localStorage.setItem("itemId", "0");
  }
  return parseInt(window.localStorage.getItem("itemId"));
}

// returns the map from local storage
function getItemMapFromStorage() {
  if (!window.localStorage.getItem("itemMap")) {
    setItemMapFromStorage(new Map());
  }
  let mapObj = JSON.parse(window.localStorage.getItem("itemMap"));
  return new Map(Object.entries(mapObj));
}

function setItemMapFromStorage(itemMap) {
  let mapObj = Object.fromEntries(itemMap);
  window.localStorage.setItem("itemMap", JSON.stringify(mapObj));
}

// add item to map in local storage
function addItemToStorage(id, text) {
  let itemMap = getItemMapFromStorage();
  let listObj = {
    content: text,
    isChecked: false,
  };
  itemMap.set(id, listObj);
  setItemMapFromStorage(itemMap);
}

// remove item from map in local storage
function removeItemFromStorage(id) {
  let itemMap = getItemMapFromStorage();
  itemMap.delete(id);
  setItemMapFromStorage(itemMap);
}

// retrieves all list items stored in local storage
function retrieveListItems() {
  let itemMap = getItemMapFromStorage();
  for (let [key, val] of itemMap) {
    let listItem = {
      key: key,
      value: val,
    };
    createListElement(listItem, true);
  }
}

function storeListItem(li) {
  let text = li.getElementsByTagName("label")[0].textContent;
  let itemId = getItemId();
  addItemToStorage(itemId, text);
}

// increments the list height depending on if an item is added or deleted
function incrementListHeight() {
  let todo_box = document.getElementById("todo__box");
  currListHeight = currListHeight + listChange;
  todo_box.style.height = currListHeight + "rem";
}

// decrements the list height depending on if an item is added or deleted
function decrementListHeight() {
  let todo_box = document.getElementById("todo__box");
  currListHeight = currListHeight - listChange;
  todo_box.style.height = currListHeight + "rem";
}

// updates check status of a list item
function updateCheckStatus(listObj, isChecked) {
  let itemMap = getItemMapFromStorage();
  let item = itemMap.get(listObj);
  item.isChecked = isChecked;
}

// creates the bubble to check off item
function createCheckButton(li, input, stored) {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo__checkbox";

  // set checkbox to status in its prior state
  if (stored) {
    let itemMap = getItemMapFromStorage();
    checkbox.checked = itemMap.get(input.key).isChecked;
  }

  checkbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      console.log("checked!");
      updateCheckStatus(input.key, true);
      // ! refactor idea: Convert the value in itemMap to an object
      // ! that holds a str label (list.label) and
      // ! boolean check status (list.isChecked).
      // ! In updateCheckStatus, set
      // ! list.isChecked = true when checked
      // ! set it to false when unchecked
    } else {
      console.log("unchecked!");
      updateCheckStatus(input.key, false);
    }
  });
  li.appendChild(checkbox);
}

// creates a delete button to right of list item;
function createDelButton(li, input, stored) {
  // create del tag
  let del = document.createElement("button");
  del.className = "todo__del";
  if (stored) {
    del.id = input.key;
  } else {
    del.id = getItemId();
  }
  // create icon tag
  let icon = document.createElement("i");
  icon.className = "fa-solid fa-x";
  del.appendChild(icon);
  // listen for delete click
  del.addEventListener("click", () => {
    li.remove();
    removeItemFromStorage(del.id);
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
function createListItem(li, input, stored) {
  createCheckButton(li, input, stored);
  createTextItem(li, input);
  createDelButton(li, input, stored);
  if (!stored) {
    storeListItem(li);
    setItemId(getItemId() + 1);
  }
}

// creates the actual list item in ul tag
function createListElement(input, stored) {
  let li = document.createElement("li");
  const ul = document.getElementById("todo__items");
  createListItem(li, input, stored);
  ul.appendChild(li);
  incrementListHeight();
}

// adds the list if input is non-empty
function addListAfterClick(input) {
  if (input.value.length > 0) {
    createListElement(input, false);
  }
}

// listens for the actual 'add' or 'enter' button press
form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevents form from auto-submitting

  let input = document.getElementById("todo__task");
  addListAfterClick(input);

  input.value = ""; // clears task name after submitting
});
