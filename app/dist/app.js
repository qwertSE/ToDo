var listElements = [];
function add() {
    const inputText = document.getElementById("input_text");
    let item = `<div class="todo__item" id="div${listElements.length}">
  <button class="check" onclick="check(${listElements.length})"></button>
  <h2 class="text" id="${listElements.length}">${inputText.value}</h2>
  <button class="del" onclick="removeItem(${listElements.length})"></button>
  <button class="update" onclick="updateItem(${listElements.length})"></button>
</div>`;
    listElements.push(inputText.value);
    var ul = document.getElementById("container-item");
    var li = document.createElement("li");
    li.innerHTML = item;
    ul.appendChild(li);
}
function removeItem(id) {
    var element = document.getElementById(`div${id}`);
    listElements.splice(listElements.indexOf(element.innerText), 1);
    element.remove();
}
function updateItem(id) {
    const inputText = document.getElementById("input_text");
    document.getElementById(id).innerText = inputText.value;
    listElements[parseInt(id)] = inputText.value;
    console.log(listElements);
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
