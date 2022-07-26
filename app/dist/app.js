var listElements = [];
const inputText = document.getElementById("input_text");
var db = localStorage;
var index;
function add() {
    index = String(listElements.length);
    createElement(inputText.value);
    db.setItem(index, inputText.value);
}
function removeItem(id) {
    var element = document.getElementById(`div${id}`);
    db.clear();
    listElements.splice(listElements.indexOf(element.innerText), 1);
    for (let i = 0; i < listElements.length; i++) {
        index = String(i);
        db.setItem(index, listElements[i]);
    }
    location.reload();
}
function updateItem(id) {
    document.getElementById(id).innerText = inputText.value;
    listElements[parseInt(id)] = inputText.value;
    listElements[Number(id)] = inputText.value;
    db.setItem(id, inputText.value);
    loadDb();
    location.reload();
}
function check(id) {
    const texto = document.getElementById(`${id}`);
    if (texto.classList.contains("done")) {
        texto.classList.remove("done");
    }
    else {
        texto.classList.add("done");
    }
}
function createElement(value) {
    let item = `<div class="todo__item" id="div${listElements.length}">
  <button class="check" onclick="check(${listElements.length})"></button>
  <h2 class="text" id="${listElements.length}">${value}</h2>
  <button class="del" onclick="removeItem(${listElements.length})"></button>
  <button class="update" onclick="updateItem(${listElements.length})"></button>
</div>`;
    listElements.push(value);
    let ul = document.getElementById("container-item");
    let li = document.createElement("li");
    li.innerHTML = item;
    ul.appendChild(li);
}
function loadDb() {
    let dbSize = db.length;
    let temp;
    if (listElements.length === 0) {
        for (let i = 0; i < dbSize; i++) {
            temp = db.getItem(String(i));
            createElement(temp);
        }
    }
}
loadDb();
