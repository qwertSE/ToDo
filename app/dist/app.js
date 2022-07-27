class Task {
    constructor(description, done) {
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
var db = localStorage;
var index;
function add() {
    let temp = new Task(inputText.value, false);
    index = String(listElements.length);
    createElement(temp);
    db.setItem(index, JSON.stringify(listElements[Number(index)]));
}
function removeItem(id) {
    let element = document.getElementById(`div${id}`);
    console.log(id);
    db.removeItem(String(id));
    listElements.splice(id, 1);
    db.clear();
    listElements.forEach(function (element, index) {
        db.setItem(String(index), JSON.stringify(element));
    });
    loadDb();
    location.reload();
}
function updateItem(id) {
    document.getElementById(id).innerText = inputText.value;
    listElements[Number(id)].descri = inputText.value;
    db.setItem(id, JSON.stringify(listElements[Number(id)]));
    loadDb();
    location.reload();
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
    let item = `<div class="todo__item" id="div${listElements.length}">
  <button class="check" onclick="check(${listElements.length})"></button>
  <h2 class="text" id="${listElements.length}">${temp.descri}</h2>
  <button class="del" onclick="removeItem(${listElements.length})"></button>
  <button class="update" onclick="updateItem(${listElements.length})"></button>
</div>`;
    listElements.push(obj);
    let ul = document.getElementById("container-item");
    let li = document.createElement("li");
    li.innerHTML = item;
    ul.appendChild(li);
}
function loadDb() {
    let dbSize = db.length;
    let temp;
    if (dbSize !== 0) {
        for (let i = 0; i < dbSize; i++) {
            temp = JSON.parse(db.getItem(String(i)));
            let task = new Task(temp["description"], temp["done"]);
            createElement(task);
            if (task.isDone) {
                const texto = document.getElementById(`${i}`);
                texto.classList.add("done");
            }
        }
    }
}
loadDb();
