var listElements = [];
function add() {
    const inputText = document.getElementById("input_text");
    let item = `<div class="todo__item" id="div${listElements.length}">
  <button class="check" onclick="check(${listElements.length})"></button>
  <h2 class="text" id="${listElements.length}">${inputText.value}</h2>
  <button class="del" onclick="removeItem(${listElements.length})"></button>
</div>`;
    listElements.push(item);
    var ul = document.getElementById("container-item");
    var li = document.createElement("li");
    li.innerHTML = item;
    ul.appendChild(li);
}
function check(id) {
    const texto = document.getElementById(`${id}`);
    console.log(texto.classList);
    if (texto.classList.contains("done")) {
        texto.classList.remove("done");
    }
    else {
        texto.classList.add("done");
    }
}
function removeItem(id) {
    var element = document.getElementById(`div${id}`);
    element.remove();
    listElements.pop();
}
