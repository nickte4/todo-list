import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/components/todo.css";
import "../styles/utils.css";

const form = document.getElementById("todo__form");
const ul = document.getElementById("todo__items");
let listHeight = 20;
const listChange = 3.5;

// creates a delete button to right of list item;
function createDelButton(li) {
  let del = document.createElement("button");
  del.className = "todo__del";
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

// creates a bubble to check off for list item
function createCheckButton(li, input) {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo__checkbox";
  li.appendChild(checkbox);
  createTextItem(li, input);
  createDelButton(li);
}

// increments the list height depending on if an item is added or deleted
function incrementListHeight() {
  let todo_box = document.getElementById("todo__box");
  listHeight += listChange;
  todo_box.style.height = listHeight + "rem";
}

// decrements the list height depending on if an item is added or deleted
function decrementListHeight() {
  let todo_box = document.getElementById("todo__box");
  listHeight -= listChange;
  todo_box.style.height = listHeight + "rem";
}

// creates the actual list item in ul tag
function createListElement(input) {
  let li = document.createElement("li");
  createCheckButton(li, input);
  ul.appendChild(li);
  incrementListHeight();
}

// adds the list if input is non-empty
function addListAfterClick(input) {
  if (input.value.length > 0) {
    createListElement(input);
  }
}

// listens for the actual 'add' button press
form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevents form from auto-submitting

  let input = document.getElementById("todo__task");
  addListAfterClick(input);

  input.value = ""; // clears task name after submitting
});
