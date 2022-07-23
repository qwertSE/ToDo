var listElements = [];
function add() {
  var inputText = document.getElementById("input_text");
  var item =
    '<div class="todo__item" id="div' +
    listElements.length +
    '">\n  <button class="check" onclick="check(' +
    listElements.length +
    ')"></button>\n  <h2 class="text" id="' +
    listElements.length +
    '">' +
    inputText.value +
    '</h2>\n  <button class="del" onclick="removeItem(' +
    listElements.length +
    ')"></button>\n</div>';
  listElements.push(listElements.length);
  var ul = document.getElementById("container-item");
  var li = document.createElement("li");
  li.innerHTML = item;
  ul.appendChild(li);
}
function check(id) {
  var texto = document.getElementById("" + id);
  console.log(texto.classList);
  if (texto.classList.contains("done")) {
    texto.classList.remove("done");
  } else {
    texto.classList.add("done");
  }
}
function removeItem(id) {
  var element = document.getElementById("div" + id);
  element.remove();
  listElements.pop();
}
