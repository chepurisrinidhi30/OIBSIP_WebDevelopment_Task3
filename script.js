let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {

    const input = document.getElementById("taskInput");

    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        date: new Date().toLocaleString()
    };

    tasks.push(task);

    input.value = "";

    saveTasks();
    renderTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

function completeTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = true;
        }

        return task;
    });

    saveTasks();
    renderTasks();
}

function editTask(id) {

    const task = tasks.find(task => task.id === id);

    const newText = prompt("Edit Task", task.text);

    if (newText && newText.trim() !== "") {

        task.text = newText.trim();

        saveTasks();
        renderTasks();
    }
}

function updateStats() {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const pending = total - completed;

    document.getElementById("totalTasks").innerText =
        total;

    document.getElementById("pendingTasks").innerText =
        pending;

    document.getElementById("completedTasks").innerText =
        completed;

    const progress =
        total === 0 ? 0 :
        (completed / total) * 100;

    document.getElementById("progress").style.width =
        progress + "%";
}

function renderTasks() {

    const pendingList =
        document.getElementById("pendingList");

    const completedList =
        document.getElementById("completedList");

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task-item";

        li.innerHTML = `
        <div class="task-content">
            <div class="task-text ${task.completed ? 'completed' : ''}">
                ${task.text}
            </div>

            <div class="task-date">
                ${task.date}
            </div>
        </div>

        <div class="actions">

            ${
                !task.completed
                ?
                `<button class="complete-btn"
                onclick="completeTask(${task.id})">
                Complete
                </button>`
                :
                ''
            }

            <button class="edit-btn"
            onclick="editTask(${task.id})">
            Edit
            </button>

            <button class="delete-btn"
            onclick="deleteTask(${task.id})">
            Delete
            </button>

        </div>
        `;

        if (task.completed) {
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }

    });

    updateStats();
}

renderTasks();