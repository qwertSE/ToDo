class Task {
  private description: string;
  private done: boolean;

  constructor(description: string, done: boolean) {
    this.description = description;
    this.done = done;
  }

  public get descri(): string {
    return this.description;
  }

  public set descri(value: string) {
    this.description = value;
  }

  public get isDone(): boolean {
    return this.done;
  }

  public set isDone(value: boolean) {
    this.done = value;
  }
}

/* Variaveis*/
var listElements: Task[] = [];
const inputText = document.getElementById("input_text") as HTMLInputElement;
var db = localStorage;
var index: string;

/* Layout Tarefas

<div class="todo__item" id="">
  <button class="check" onclick=""></button>
  <h2 class="text" id="">text</h2>
  <button class="del" onclick=""></button>
</div>` 

*/

/* Criando um elemento pela primeira vez usando o layout. */
function add(): void {
  let temp = new Task(inputText.value, false);
  index = String(listElements.length);

  createElement(temp);

  db.setItem(index, JSON.stringify(listElements[Number(index)]));
}

/* Remove o item do array e do localStorage fazendo um reload na pagina para organizalos. */
function removeItem(id: number): void {
  console.log(id);

  db.removeItem(String(id));
  listElements.splice(id, 1);
  db.clear();

  listElements.forEach(function (element, index) {
    db.setItem(String(index), JSON.stringify(element));
  });
 
 location.reload();
}

/* Atualiza o valor da task selecionada. */
function updateItem(id: string): void {
  document.getElementById(id).innerText = inputText.value;

  listElements[Number(id)].descri = inputText.value;
  db.setItem(id, JSON.stringify(listElements[Number(id)]));
}

/* Marca como completa a task selecionada. */
function check(id: number): void {
  const texto = document.getElementById(`${id}`);

  if (listElements[id].isDone) {
    listElements[id].isDone = false;
    texto.classList.remove("done");
    db.setItem(String(id), JSON.stringify(listElements[Number(id)]));
  } else {
    listElements[id].isDone = true;
    db.setItem(String(id), JSON.stringify(listElements[Number(id)]));
    texto.classList.add("done");
  }
}

/* Função de criação do elemento HTML */
function createElement(obj: Task): void {
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

/* Função para carregamento do LocalStorage caso exista. */
function loadDb() {
  let dbSize = db.length;
  let temp;
  let element: HTMLElement;

  if (dbSize !== 0) {
    for (let i = 0; i < dbSize; i++) {
      temp = JSON.parse(db.getItem(String(i)));
      let task = new Task(temp["description"], temp["done"]);
      createElement(task);

      /* Verifica se a task estava marcada como completa e modifica o elemento HTML */
      if (task.isDone) {
        element = document.getElementById(`${i}`);
        element.classList.add("done");
      }
    }
  }
}

loadDb();
