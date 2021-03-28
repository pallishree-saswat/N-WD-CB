//select elements
const form = document.getElementById('task-form');
const submitBtn = document.getElementById('submit');
const input = document.getElementById('task');
const lists = document.getElementById('list')




form.addEventListener('submit', addTodo);



//add todo
function addTodo(e){
 e.preventDefault()
 
 //create li

  const todoText = input.value;
  const container = document.createElement('div')
  const li = document.createElement('li');
  li.innerText = todoText;

 container.appendChild(li)

const btn1 = document.createElement('button');
btn1.className = 'remove-btn';
btn1.innerHTML = '<i class="fa fa-trash"></i>'
container.appendChild(btn1)


const btn2 = document.createElement('button');
btn2.className = 'edit-btn';
btn2.innerHTML = '<i class="fa fa-edit"></i>'
container.appendChild(btn2)

lists.appendChild(container)



//clear input
input.value = ""


//romove item
btn1.onclick = function (e)
{
   container.remove()
}


//edit item
btn2.onclick = function(e){
const editedValue = prompt('Edit the selected item', li.innerText);
 li.innerText = editedValue;
}


}