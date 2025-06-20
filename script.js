function pinTask() {
    const input = document.getElementById('taskInput'); //Creating constant variable 'input' which is getting what is held in the taskInput textbox element
    const text = input.value.trim(); // This is trimming spaces on the 'input'

    // As long as the textBox aka 'taskInput' is not empty then it runs
    if (text !== '') {
        const item = document.createElement('li'); // Makes a list item (but not displayed on screen)
        item.className = 'task-item'; 

        // Gets the text from the text box
        const taskText = document.createElement('span');
        taskText.textContent = text;

        // This is used to obtain the date selected next to the 'add task' button
        // it will use the date selected and put it next to the add task
        const taskDate = document.createElement('small');
        const dateInputValue = document.getElementById('taskDate').value;
        taskDate.textContent = `Due: ${dateInputValue || 'No Date'}`;

        //Adding a container for completed and remove tasks
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-group'

        //Adding a task compeleted button
        const taskCompleteBtn = document.createElement('button');
        taskCompleteBtn.textContent = '✔';
        
        // Creating a delete button next to the task
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';

        // When the checkmark button is clicked it will line through the task to show it is completed
        taskCompleteBtn.addEventListener('click', () => {
            item.style.textDecoration = 
                item.style.textDecoration === 'line-through' ? 'none' : 'line-through';
        });

        //Adding the click event to allow removal of task
        deleteBtn.addEventListener('click', () => {
            item.remove();
        });

        // Adding the buttons into the button container
        buttonContainer.appendChild(taskCompleteBtn);
        buttonContainer.appendChild(deleteBtn);

        // Adding the buttons to the list item and the date
        item.appendChild(taskDate);
        item.appendChild(taskText);
        item.appendChild(buttonContainer);

        document.getElementById('taskList').appendChild(item); // Now it adds the item to the ul 'taskList'
        input.value = ""; //Resets the textBox to its default placeHolder
    }
}

document.getElementById('addTask').addEventListener('click', pinTask); //When the 'addTask' button is clicked it runs the pinTask function



  


