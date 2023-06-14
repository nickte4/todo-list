import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/components/todo.css";
import "../styles/utils.css";

let form = document.getElementById("todo__form");
let ul = document.getElementById("todo__items");
let listHeight = 20;
let listChange = 3.5;

function createCheckButton(li, input) {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo__checkbox";
  li.appendChild(checkbox);
  let text = document.createElement("label");
  text.appendChild(document.createTextNode(input.value));
  li.appendChild(text);
}

// changes the list height depending on if an item is added or deleted
function changeListHeight() {
  let todo_box = document.getElementById("todo__box");
  listHeight += listChange;
  todo_box.style.height = listHeight + "rem";
}

// creates the actual list item in ul tag
function createListElement(input) {
  let li = document.createElement("li");
  createCheckButton(li, input);
  ul.appendChild(li);
  changeListHeight();
}

// adds the list if input is non-empty
function addListAfterClick(input) {
  if (input.value.length > 0) {
    createListElement(input);
  }
}

// listen for check-offs
for (let i = 0; i < ul.childNodes.length; i++) {}

// listens for the actual 'add' button press
form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevents form from auto-submitting

  let input = document.getElementById("todo__task");
  addListAfterClick(input);

  input.value = ""; // clears task name after submitting
});
