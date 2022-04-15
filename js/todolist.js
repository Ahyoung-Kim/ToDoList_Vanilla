const todoBox = document.querySelector('.todo-box');
const todoForm = document.querySelector('.input-box');
const todoInput = document.querySelector('.input-box #input');
const enter = document.querySelector('.input-box #enter');
const reset = document.querySelector('.input-box #reset');
const todoList = document.querySelector('#todo-list');

let toDos = [];

function saveToDos(){
  localStorage.setItem("todos", JSON.stringify(toDos));
}

//삭제
function deleteToDO(event){
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id != parseInt(li.id));
  saveToDos();

  if(todoList.childElementCount <= 7){
    todoBox.classList.remove('box-grow');
  }
}

function crossLine(event){
  const li = event.target.parentElement;
  const text = li.firstChild;
  text.classList.add('complete');
}

//리스트 화면에 보이기
function paintToDO(newToDoObj) {
  //새로운 li 태그 생성
  //span은 todolist 텍스트
  //button은 삭제 버튼
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btn1 = document.createElement("button");
  const btn2 = document.createElement("button");

  btn1.id = "btn-red";
  btn2.id = "btn-green"
  li.id = newToDoObj.id;
  span.innerText = newToDoObj.text + " ";
  btn1.innerText = "x";
  btn2.innerText = "o"

  btn1.addEventListener("click", deleteToDO);
  btn2.addEventListener("click", crossLine);

  li.appendChild(span);
  li.appendChild(btn1);
  li.appendChild(btn2);
  todoList.appendChild(li);
}

//toDos에 새로운 리스트 추가하고 리스트 화면에 보이기
function addToDoList(event) {
  event.preventDefault();
  const newToDo = todoInput.value;
  todoInput.value = "";
  //지울 때 id 보고 지우도록
  const newToDoObj = {
    text: newToDo,
    id: Date.now()
  };

  toDos.push(newToDoObj);
  paintToDO(newToDoObj);
  saveToDos();

  if(todoList.childElementCount > 7){
    todoBox.classList.add('box-grow');
  }
}

function enterHandle(event){
  if(todoInput.value == ""){
    event.preventDefault();
  }
}

function resetHandle(event){
  console.log("reset!");
  while(todoList.hasChildNodes()){
    todoList.removeChild(todoList.firstChild);
    if(todoList.childElementCount <= 7){
      todoBox.classList.remove('box-grow');
    }
  }
  const empty = [];
  localStorage.setItem("todos", JSON.stringify(empty));
}

todoForm.addEventListener('submit', addToDoList);
enter.addEventListener('click', enterHandle);
reset.addEventListener('click', resetHandle);

const saved = localStorage.getItem("todos");

if(saved){
  const parsedToDos = JSON.parse(saved);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDO);

  if(todoList.childElementCount > 7){
    todoBox.classList.add('box-grow');
  }
}