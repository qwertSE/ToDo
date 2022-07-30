class Task {
    constructor(description, done = false) {
        this.description = description;
        this.done = done;
    }
    get descri() {
        return this.description;
    }
    set descri(value) {
        this.description = value;
    }
    get isDone() {
        return this.done;
    }
    set isDone(value) {
        this.done = value;
    }
}
var listElements = [];
const inputText = document.getElementById("input_text");
const errorInput = document.getElementById("todo__error");
var db = localStorage;
var index;
function add() {
    if (notNull()) {
        let temp = new Task(inputText.value);
        index = String(listElements.length);
        createElement(temp);
        db.setItem(index, JSON.stringify(listElements[Number(index)]));
    }
}
function removeItem(id) {
    console.log(id);
    listElements.splice(id, 1);
    db.clear();
    listElements.forEach(function (element, index) {
        db.setItem(String(index), JSON.stringify(element));
    });
    location.reload();
}
function updateItem(id) {
    if (notNull()) {
        document.getElementById(id).innerText = inputText.value;
        listElements[Number(id)].descri = inputText.value;
        db.setItem(id, JSON.stringify(listElements[Number(id)]));
    }
}
function check(id) {
    const texto = document.getElementById(`${id}`);
    if (listElements[id].isDone) {
        listElements[id].isDone = false;
        texto.classList.remove("done");
        db.setItem(String(id), JSON.stringify(listElements[Number(id)]));
    }
    else {
        listElements[id].isDone = true;
        db.setItem(String(id), JSON.stringify(listElements[Number(id)]));
        texto.classList.add("done");
    }
}
function createElement(obj) {
    let temp = obj;
    let item = `<div class="container__item" id="div${listElements.length}">
  <button class="check" onclick="check(${listElements.length})"></button>
  <h2 class="form__text" id="${listElements.length}">${temp.descri}</h2>
  <button class="del" onclick="removeItem(${listElements.length})"></button>
  <button class="update" onclick="updateItem(${listElements.length})"></button>
</div>`;
    listElements.push(obj);
    let ul = document.getElementById("todo__container");
    let li = document.createElement("li");
    li.innerHTML = item;
    ul.appendChild(li);
}
function loadDb() {
    let dbSize = db.length;
    let temp;
    let element;
    if (dbSize !== 0) {
        for (let i = 0; i < dbSize; i++) {
            temp = JSON.parse(db.getItem(String(i)));
            let task = new Task(temp["description"], temp["done"]);
            createElement(task);
            if (task.isDone) {
                element = document.getElementById(`${i}`);
                element.classList.add("done");
            }
        }
    }
}
function notNull() {
    if (inputText.value != "" && !inputText.value.match(/^\s+$/)) {
        return true;
    }
    else {
        setTimeout(() => {
            errorInput.style.display = "none";
            return false;
        }, 3000);
        errorInput.style.display = "block";
    }
}
loadDb();
