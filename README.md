### URL
[https://apomodoro.herokuapp.com/](https://apomodoro.herokuapp.com/)

### Github URL
[https://github.com/builditdan/a_pomodoro](https://github.com/builditdan/a_pomodoro)


### Background and General Information
I built this JavaScript site during my front-end training with [bloc.io](https://bloc.io).

It is a single page website that will help you manage your time using the [Pomodoro Technique](http://pomodorotechnique.com/) .  You can time your events and record your tasks.  The timer has the following sequences:

> 25min session -> 5min break -> 25min session -> 5min break -> 25min session -> 5min break -> 25min session -> 15min break -> START OVER

### Design Information
This project uses AngularJS to create the task list and manage the timer. I used Kristiyan Kostadinov [progress bar](https://github.com/crisbeto/angular-svg-round-progressbar) during the timed events . I used Google's [Firebase](https://firebase.google.com/) solution to store the task data.

My biggest challenge in this project was learning when to use a angular [service vs. a directive](http://kirkbushell.me/when-to-use-directives-controllers-or-services-in-angular/).

In the end, I used a directive to handle the timer tasks since they were DOM focused  and added a service for task management activities. My thinking was the timer and page elements would be page focused whereas task services might be used throughout the website. That is if I expanded on the project. Another good read on this topic can be found at this thread at [stack overflow] (http://stackoverflow.com/questions/11171778/difference-between-service-directive-and-module).

### Highlights on scripts included
* [angular](http://angular-ui.github.io/) for development
* [Firebase](https://firebase.google.com/docs/) for storing tasks
* [UI Router](https://github.com/angular-ui/ui-router) for angular routing
* [Buzz Sound](http://buzz.jaysalvat.com/) for playing ding at the end of a timer
* [Progress bar](https://github.com/crisbeto/angular-svg-round-progressbar) for displaying a progress bar

### Additional comments
Do note that the tasks are the same for all users. A future enhancement would be to store them per user session or account. Obviously this shortcoming does not make the web page very useful for multiple users but this was a training exercise.

### Disclaimer
I provide this Web site as an example of my work. It is **not a production site** and subject to **removal** along with any content that you may have created. If you are interested in using this site or the code - feel free to download or contact me with your questions.
