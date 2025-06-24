# All-In-One-Organizer-WebApp
This will track recurring finances and give the user the ability to organize tasks


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Day #1  Date: June 14, 2025


-Created GitHub Repository

-Created a devoloper branch to be used for testing and practiced commands to do so,
now I have two branches (main, dev).

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Day #2 Date: June 15, 2025


-Became way more comfortable with git commands

-Added a good amount of code to index.html which allows me to have a starting place for my app,

-I added a link to connect my style.css to my index.html and added a script.js to my html.

-I understand everything that is happening in the index.html except for 'div class', at this point
I assume that it is just creating a container to hold everything inside of it. Will research more to
get a better understanding.

-I added a few visible components to my page and created a test function to give an action to the button when clicked, currently when you click the 'Add Task' button it changes the background colour to light blue. 

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Day #3 Date: June 16, 2025

-Created a working function pinTask in script.js which allows you to add a task to an unordered list, it gives you the option to "check mark" the task which lines through it to show its completed, or "x" it to remove the task completely

-Added some styling to the css to make the text of the tasks to break apart into multiple lines..

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Day #4 Date: June 20, 2025

-Reformatted index.html to handle dates for tasks, add consolidated these tasks into a class called task-wrapper

-Wanted a way to uncomplete a task after it was completed, figured out this issue and it now works as intended.

-Added a bunch of styling to the css to make the app more visually pleasing, mainly getting everything into 3 columns with the matching spacing so that it looks clean.

-Next step will be to implement a calendar to add tasks with a date to a visual calendar

-After adding the calendar I will add another column to allow for finacial tracking, mainly recurring payments.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Day #5 Date: June 22, 2025

-Added a calendar, using a link within my index.html called 'fullCalendar' had to edit some functions to get it to work

-ISSUE that I had was getting the calendar to appear. The issue at first was within my index.html and script.js. In my js file under the comment 'Initialize Calendar' I was trying to pass my cons calendarTasks with '' and thes quotations were incorrect and I needed to pass it directly. I also needed to change the version for the script I was using in my index.html. This was resolved and it is working correctly

-Now you have a visual calendar which you can see your tasks in a clearer view. If the task has no date it is not shown(will figure something out for this)

-The calendar is centered but I will be adding some styling to it.

-Next steps are to finish decorations and visuals for calendar. Then after that is to incorporate recurring payments

*NO CURRENT ISSUES*

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Day #6 Date: June 24, 2025

-Reformatted divs for calendar and tasks, re positioned calendar to clean up UI.

-Main feature added was the feature to be able to line through a task on the task list and to also reflect this on the calendar.

-Experienced issue trying to get the task to update in real time, originally it was only updating the calendar when i reloaded the page. Now it works correctly. Issue resolved

-Next steps are add a few more features to the calendar like a place for tasks with no date and I want to be able to select a task from the calendar to show more deatiled information on the task

-Next step as well is to incorporate another conatiner to reflect recurring expenses

-ALSO I'm not sure how to implement this but I want a way to send text message reminders of when a payment is coming up

*NO CURRENT ISSUES*

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------