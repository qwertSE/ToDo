var listElements: string[] = [];

function add(): void {
  const inputText = document.getElementById("input_text") as HTMLInputElement;

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
  /* console.log(text[0].innerHTML = inputText.value); */
}

function check(id: number): void {
  const texto = document.getElementById(`${id}`);
  console.log(texto.classList);

  if (texto.classList.contains("done")) {
    texto.classList.remove("done");
  } else {
    texto.classList.add("done");
  }
}

function removeItem(id: number) {
  var element = document.getElementById(`div${id}`);
  element.remove();

  listElements.pop();
}
