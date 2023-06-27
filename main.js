const input = document.querySelector('input');
const addBtn = document.querySelector('.add-btn');
const todoBoard = document.querySelector('.todo-board');
const tabs = document.querySelectorAll('.tab-group div');
const underLine = document.querySelector('.under-line');
const li = document.querySelector('li');

let todoList = [];
let filteredList = [];
let mode = 'all';

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (e) {
    filter(e);
  });
}

const addTodo = () => {
  let todoValue = {
    id: randomId(),
    value: input.value,
    isComplete: false,
  };
  todoList.push(todoValue);
  render();
};

const render = () => {
  let renderHTML = '';
  let list = [];
  if (mode === 'all') {
    list = todoList;
  } else {
    list = filteredList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      renderHTML += `
  <li class="checked"><span>${list[i].value}</span> <div><button class="check-btn btn btn-success" onClick="checkBtn('${list[i].id}')">체크</button><button class="del-btn btn btn-danger" onClick="deleteBtn('${list[i].id}')">삭제</button></div></li>
  `;
    } else {
      renderHTML += `
<li><span>${list[i].value}</span> <div><button class="check-btn btn btn-success" onClick="checkBtn('${list[i].id}')">체크</button><button class="del-btn btn btn-danger" onClick="deleteBtn('${list[i].id}')">삭제</button></div></li>
  `;
    }
    input.value = '';
  }
  todoBoard.innerHTML = renderHTML;
};

const randomId = () => {
  return Math.random().toString(36).substr(2, 16);
};

const checkBtn = (id) => {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id) {
      todoList[i].isComplete = !todoList[i].isComplete;
      break;
    }
  }
  filter();
};

const deleteBtn = (id) => {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id) {
      todoList.splice(i, 1);
      render();
    }
  }
  filter();
};

const filter = (e) => {
  if (e) {
    mode = e.target.id;
    underLine.style.width = e.target.offsetWidth + 'px';
    underLine.style.left = e.target.offsetLeft + 'px';
    underLine.style.top =
      e.target.offsetTop + (e.target.offsetHeight + 10) + 'px';
  }

  filteredList = [];
  if (mode === 'all') {
  } else if (mode === 'ing') {
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].isComplete === false) {
        filteredList.push(todoList[i]);
      }
    }
  } else if (mode === 'done') {
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].isComplete === true) {
        filteredList.push(todoList[i]);
      }
    }
  }
  render();
};

addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => {
  if (e.code == 'Enter') {
    addTodo();
  }
});
