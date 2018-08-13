//Variables
const TaskForm = document.querySelector('form');
const taskList = document.querySelector('.text-input')
const Ul = document.querySelector('.TaskList')
const addTask = document.querySelector('.SubmitBtn')
const filterTask = document.querySelector('.filterTask')
const clearTask = document.querySelector('.clearBtn')

console.log(TaskForm)
console.log(taskList)
console.log(addTask)
console.log(filterTask)
console.log(clearTask)
console.log(Ul)





//Event listeners

eventListeners();

function eventListeners() {

    TaskForm.addEventListener('submit', addContent);
    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Create a Delegation Technique for Remove-task on click X
    Ul.addEventListener('click', removeTask)

    //Create a Delegation Technique for ClearButton
    clearTask.addEventListener('click', clearTasks)

    //filter the tasks 
    filterTask.addEventListener('keyup', filterTasks)
}



//Functions

//Get tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    // console.log(tasks)
    tasks.forEach(function (task) {
        //Create an li element 
        const li = document.createElement('li');
        //Add class to the Li
        li.className = 'list-item';
        //append the content to the li
        li.appendChild(document.createTextNode(task));
        //append it to the Ul element
        Ul.appendChild(li);
        //Create a new anchor Tag
        const removeBtn = document.createElement('a');
        //add class to the a element
        removeBtn.className = 'remove-task';
        //add the content to the a tag
        removeBtn.appendChild(document.createTextNode('x'))
        //append it to the Li
        li.appendChild(removeBtn)
    })
}

//add tasks
function addContent(e) {
    e.preventDefault()
    if (taskList.value === '') {
        alert('Please alert something')
    } else {
        //Create an li element 
        const li = document.createElement('li');
        //Add class to the Li
        li.className = 'list-item';
        //append the content to the li
        li.appendChild(document.createTextNode(taskList.value));
        //append it to the Ul element
        Ul.appendChild(li);
        //Create a new anchor Tag
        const removeBtn = document.createElement('a');
        //add class to the a element
        removeBtn.className = 'remove-task';
        //add the content to the a tag
        removeBtn.appendChild(document.createTextNode('x'))
        //append it to the Li
        li.appendChild(removeBtn)

        //Add to Local Storage
        addToLocalStorage(taskList.value);

    }
}


//Remove task on click X
function removeTask(e) {
    if (e.target.parentElement.classList.contains('list-item'))
        confirm('are u sure?')
    e.target.parentElement.remove()

    //remove from LS
    removeTaskLocalStorage(e.target.parentElement)
}

//remove from ls function
function removeTaskLocalStorage(taskItem) {
    console.log(taskItem)
    // let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    console.log(tasks)
    tasks.forEach(function (task, index) {
        console.log(taskItem.textContent.substring(0, taskItem.textContent.length - 1))
        console.log(task)
        // console.log(taskItem.textContent)
        if (taskItem.textContent.substring(0, taskItem.textContent.length - 1) === task) {
            tasks.splice(index, 1)
        }
    })
    //console.log(tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Remove task on click ClearTask button
function clearTasks() {
    //InnerHTML method(Slower)
    //Ul.innerHTML = '';
    //RemoveChild method(Faster)  
    while (Ul.firstChild) {
        Ul.removeChild(Ul.firstChild);
    }
    //Remove from LS
    removeTaskLocalStorage();
}

//Remove from LS function
function removeTaskLocalStorage() {
    localStorage.clear()
}
//Filter tasks
function filterTasks(e) {
    const text = (e.target.value.toLowerCase()) //store value entered in the filter-area
    document.querySelectorAll('.list-item').forEach(function (task) { //loop through the all the tasks present
        const item = task.firstChild.textContent; //select the first child's content
        if (item.toLocaleLowerCase().indexOf(text) === -1) { //if the text present in the item then show the 'li'
            task.style.display = 'none'
        } else {
            task.style.display = 'block' //if not present don't show
        }

    })
}

//Add tasks to the local storage
function addToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))

}