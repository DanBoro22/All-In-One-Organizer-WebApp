// Gathers current tasks displayed in the DOM and returns them as an array of objects
function getTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        const text = item.querySelector('span').textContent; // Task text
        let dateStr = item.querySelector('small').textContent.replace('Due: ', '');

        //If there is no date, make an dateStr and empty str ''
        if (dateStr === 'No Date') dateStr = '';

        const completed = item.style.textDecoration === 'line-through';

        tasks.push({text, date: dateStr, completed});
    });
    return tasks;
}

// Save all tasks (from the DOM) to localStorage as a JSON string
function saveTasks() {
    const tasks = getTasks(); // Get current tasks
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to localStorage
}

function loadTasks() {
    const saved = localStorage.getItem('tasks');

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return parsed.map(task => ({
        text: task.text,
        date: task.date || '',
        completed: !!task.completed
    }));
}

function addTaskToDOM(text, date, completed = false) {
    const item = document.createElement('li');
    item.className = 'task-item';

    // Mark whether this task has a date
    item.dataset.hasDate = date ? 'true' : 'false';

    // Task text
    const taskText = document.createElement('span');
    taskText.textContent = text;

    // Due date display
    const taskDate = document.createElement('small');
    taskDate.textContent = `Due: ${date || 'No Date'}`;

    // Buttons container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-group';

    // Complete button
    const taskCompleteBtn = document.createElement('button');
    taskCompleteBtn.textContent = '✔';

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';

    // Apply completed state if needed
    if (completed) {
        item.style.textDecoration = 'line-through';
    }

    // Toggle completion
    taskCompleteBtn.addEventListener('click', () => {
        const nowCompleted = item.style.textDecoration !== 'line-through';
        item.style.textDecoration = nowCompleted ? 'line-through' : 'none';
        saveTasks();
    });

    // Delete task
    deleteBtn.addEventListener('click', () => {
        item.remove();
        saveTasks();
    });

    // Assemble
    buttonContainer.append(taskCompleteBtn, deleteBtn);
    item.append(taskDate, taskText, buttonContainer);
    document.getElementById('taskList').appendChild(item);

    return item;
}

// Function that handles the process of adding a task when the user clicks "Add Task"
function pinTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    const date = document.getElementById('taskDate').value;
    const time = document.getElementById('taskTime').value;

    // Combine date and time if both provided
    let dateTime = date;
    if (date && time) {
        dateTime += `T${time}`;
    }

    // Only add non-empty tasks
    if (!text) return;

    addTaskToDOM(text, dateTime);
    saveTasks();

    // Clear inputs
    input.value = '';
    document.getElementById('taskDate').value = '';
    document.getElementById('taskTime').value = '';
}

// Set up initial rendering and filters
document.addEventListener('DOMContentLoaded', () => {
    // Render saved tasks
    loadTasks().forEach(task => {
        addTaskToDOM(task.text, task.date, task.completed);
});

    // Show all tasks
    document.getElementById('showAllTasks').addEventListener('click', () => {
        document.querySelectorAll('.task-item').forEach(item => {
            item.style.display = '';
        });
  });

    // Show only tasks with a date
    document.getElementById('showDatedTasks').addEventListener('click', () => {
        document.querySelectorAll('.task-item').forEach(item => {
            item.style.display = item.dataset.hasDate === 'true' ? '' : 'none';
        });
  });

    // Show only tasks without a date
    document.getElementById('showUndatedTasks').addEventListener('click', () => {
        document.querySelectorAll('.task-item').forEach(item => {
            item.style.display = item.dataset.hasDate === 'false' ? '' : 'none';
        });
  });

    // Bind Add Task
    document.getElementById('addTask').addEventListener('click', pinTask);
});