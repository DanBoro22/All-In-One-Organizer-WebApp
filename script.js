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

function updateCalendarView(dateStr, instance) {
  // — 1. Update the header
  const displayDate = instance.formatDate(instance.selectedDates[0], "F j, Y");
  document.getElementById("selectedDate").textContent = displayDate;

  // — 2. Filter your task list to just that day
  document.querySelectorAll(".task-item").forEach(item => {
    const raw = item.querySelector("small").textContent.replace("Due: ", "");
    // show only if it begins with "YYYY-MM-DD"
    item.style.display = raw.startsWith(dateStr) ? "" : "none";
  });

  // — 3. Build the hourly itinerary
  const allTasks = getTasks();  
  // pick only tasks on dateStr **with** times (i.e. those containing "T")
  const timed = allTasks.filter(t => t.date.startsWith(dateStr) && t.date.includes("T"));
  const ul = document.getElementById("hourlyList");
  ul.innerHTML = "";

  for (let h = 0; h < 24; h++) {
    const label = `${h.toString().padStart(2, "0")}:00`;
    // find any tasks at that hour
    const atHour = timed.filter(t => {
      const hourPart = t.date.split("T")[1].split(":")[0];
      return parseInt(hourPart, 10) === h;
    });
    const li = document.createElement("li");
    li.textContent = atHour.length
      ? `${label} – ${atHour.map(t => t.text).join(", ")}`
      : label;
    ul.appendChild(li);
  }
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




    flatpickr("#calendar", {
        inline: true,
        onChange: (selectedDates, dateStr, instance) => {
            if (!selectedDates.length) return;
            updateCalendarView(dateStr, instance);
        }
    });

    const today = new Date();
    const isoToday = today.toISOString().slice(0, 10);

    document.getElementById("selectedDate").textContent = flatpickr.formatDate(today, "F j, Y");
    updateCalendarView(isoToday, { selectedDates: [today], formatDate: flatpickr.formatDate });



});








  


