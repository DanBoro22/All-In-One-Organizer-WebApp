/*
function testButton() {
    addTask.addEventListener('click', () => {
        document.body.style.backgroundColor = "lightblue";
    });
}
*/


/*

This function 'pinTask' will take the text within the text box and
will add it to the unordered list 

*/
function pinTask() {
    const input = document.getElementById('taskInput'); //Creating constant variable 'input' which is getting what is held in the taskInput textbox element
    const text = input.value.trim(); // This is trimming spaces on the 'input'

    // As long as the textBox aka 'taskInput' is not empty then it runs
    if (text !== '') {
        const item = document.createElement('li'); // Makes a list item (but not displayed on screen)
        item.textContent = text; // Gets the item in the textBox 'taskInput'

        //Adding a task compeleted button
        const taskCompleteBtn = document.createElement('button');
        taskCompleteBtn.textContent = '✔';
        taskCompleteBtn.style.marginRight = '2px';

        // When the checkmark button is clicked it will line through the task to show it is completed
        taskCompleteBtn.addEventListener('click', () => {
            item.style.textDecoration = 'line-through';
        });

        // Creating a delete button next to the task
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.style.marginLeft = '2px';

        //Adding the click event to allow removal of task
        deleteBtn.addEventListener('click', () => {
            item.remove();
        });

        // Adding the buttons to the list item
        item.appendChild(taskCompleteBtn);
        item.appendChild(deleteBtn);

        document.getElementById('taskList').appendChild(item); // Now it adds the item to the ul 'taskList'
        input.value = ""; //Resets the textBox to its default placeHolder
    }
}

document.getElementById('addTask').addEventListener('click', pinTask); //When the 'addTask' button is clicked it runs the pinTask function



  


