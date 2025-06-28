let calendar; // Will hold the calendar instance

// Function that handles the process of adding a task when the user clicks "Add Task"
function pinTask() {
    const input = document.getElementById('taskInput'); // Get the task input field
    const text = input.value.trim(); // Trim whitespace from the input
    const date = document.getElementById('taskDate').value; // Get the date input value

    // If task input is not empty, proceed to add the task
    if (text !== '') {
        const item = addTaskToDOM(text, date);
        saveTasks();

        if (date && calendar) {
            const eventID = `${text}-${date}`; // Creates a unique event ID       
            const newEvent = calendar.addEvent({
                id: eventID,
                title: text,
                start: date,
                classNames:[],
            });
            item.dataset.eventID = eventID;
        }

        input.value = "";          // Clear task input field
        document.getElementById('taskDate').value = ""; // Clear date input field
    }
}

// Gathers current tasks displayed in the DOM and returns them as an array of objects
function getTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        const text = item.querySelector('span').textContent; // Task text
        const date = item.querySelector('small').textContent.replace('Due: ', ''); // Extract date string
        const completed = item.style.textDecoration === 'line-through'; // Check if task is marked complete
        tasks.push({ text, date, completed }); // Add to tasks array
    });
    return tasks;
}

// Save all tasks (from the DOM) to localStorage as a JSON string
function saveTasks() {
    const tasks = getTasks(); // Get current tasks
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to localStorage
}

// Load tasks from localStorage and return them as an array
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : []; // If tasks exist, parse and return them, otherwise return empty array
}

// Add a new task item to the DOM
function addTaskToDOM(text, date, completed = false) {
    const item = document.createElement('li'); // Create <li> element
    item.className = 'task-item';              // Set CSS class

    // Create span for task text
    const taskText = document.createElement('span');
    taskText.textContent = text;

    // Create small element to display due date
    const taskDate = document.createElement('small');
    taskDate.textContent = `Due: ${date || 'No Date'}`; // Default to "No Date" if not provided

    // Create container div to hold the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-group';

    // Create 'Complete' button (✔)
    const taskCompleteBtn = document.createElement('button');
    taskCompleteBtn.textContent = '✔';

    // Create 'Delete' button (X)
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';

    // If task is marked as completed, show it with line-through
    if (completed) {
        item.style.textDecoration = 'line-through';
    }

    // Toggle task completion when ✔ button is clicked
    taskCompleteBtn.addEventListener('click', () => {
        const nowCompleted = item.style.textDecoration !== 'line-through';
        item.style.textDecoration = nowCompleted ? 'line-through' : 'none';
        saveTasks();

        const eventID = item.dataset.eventID;
        if (eventID && calendar) {
            const event = calendar.getEventById(eventID);
            if (event) {
                event.setProp('classNames', nowCompleted ? ['completed-task'] : []);
            }
        }
    });

    // Remove task from DOM when X button is clicked
    deleteBtn.addEventListener('click', () => {
        const eventID = item.dataset.eventID;

        if (eventID && calendar) {
            const event = calendar.getEventById(eventID);
            if (event) {
                event.remove();
            }
        }
        
        
        item.remove();  // Remove task from DOM
        saveTasks();    // Save updated list
    });

    // Add both buttons to the container
    buttonContainer.appendChild(taskCompleteBtn);
    buttonContainer.appendChild(deleteBtn);

    // Add date, text, and buttons to the <li> item
    item.appendChild(taskDate);
    item.appendChild(taskText);
    item.appendChild(buttonContainer);

    // Append the completed task item to the task list in the DOM
    document.getElementById('taskList').appendChild(item);

    if (date) {
        item.dataset.eventID = `${text}-${date}`;
    }

    return item;
}

// When the page loads, restore any saved tasks from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedTasks = loadTasks(); // Get saved tasks

    savedTasks.forEach(task => {
        addTaskToDOM(task.text, task.date, task.completed); // Re-render each task
    });

    //Initializing calendar
    const calendarTasks = document.getElementById('calendar');
    calendar = new window.FullCalendar.Calendar(calendarTasks, {
    initialView: 'dayGridMonth',
    dayMaxEvents: true,
    events: savedTasks
        .filter(task => task.date)
        .map(task => ({
            id: `${task.text}-${task.date}`,
            title: task.text,
            start: task.date,
            classNames: task.completed ? ['completed-task'] : [],
        }))
});

calendar.render();

    // Button to show all tasks
    document.getElementById('showAllTasks').addEventListener('click', () => {
        document.querySelectorAll('.task-item').forEach(item => {
            item.style.display = '';
        });
    });

    // Button to show tasks with a date
    document.getElementById('showDatedTasks').addEventListener('click', () => {
        document.querySelectorAll('.task-item').forEach(item => {
            const hasDate = item.querySelector('small').textContent !== 'Due: No Date';
            item.style.display = hasDate ? '' : 'none';
        });
    });

    // Button to show tasks without a date
    document.getElementById('showUndatedTasks').addEventListener('click', () => {
        document.querySelectorAll('.task-item').forEach(item => {
            const hasDate = item.querySelector('small').textContent !== 'Due: No Date';
            item.style.display = hasDate ? 'none' : '';
        });
    });
});



// Add event listener to the "Add Task" button to trigger the pinTask function
document.getElementById('addTask').addEventListener('click', pinTask);





  


