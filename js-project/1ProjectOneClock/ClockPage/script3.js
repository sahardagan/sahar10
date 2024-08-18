const formElement = document.querySelector(".form-container");
const taskInputElement = document.querySelector(".task-input");
const dateInputElement = document.querySelector(".date-input");
const taskListElement = document.querySelector(".tasks-list");
let taskList = [];

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000000);
    const newTask = {
        id: id,
        title: taskInputElement.value,
        date: dateInputElement.value,
    };
    taskList.push(newTask);
    localStorage.setItem("task-list", JSON.stringify(taskList))
    console.log(newTask)
    handleAddTask(dateInputElement.value, taskInputElement.value, id)

})


function handleAddTask(dateString, title, id) {
    const li = document.createElement("li");
    li.className = "list-item";
    li.id = id;

    const titleElement = document.createElement("div");
    titleElement.className = "task-title";
    titleElement.textContent = title;

    const deleteElement = document.createElement("button");
    deleteElement.className = "btn-delete";
    deleteElement.textContent = "Delete";

    const timeElement = document.createElement("div");
    timeElement.className = "time-left";
    timeElement.textContent = `${dateDifference(dateString)} days left `;

    li.appendChild(titleElement);
    li.appendChild(timeElement);
    li.appendChild(deleteElement);
    taskListElement.appendChild(li);

}

function dateDifference(dateString) {
    const now = new Date().getTime();
    const futureDate = new Date(dateString).getTime();
    const timeDifference = futureDate - now;
    const daysLeft = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));

    return daysLeft;
}

