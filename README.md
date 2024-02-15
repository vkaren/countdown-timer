# Countdown timer

The Countdown Timer application allows users to set dynamic timers using a structured form and receive notifications when the timer expires.

<img src="./readme_imgs/app-form.png" width="200px">

<img src="./readme_imgs/app.png" width="200px">

## How it works?

The application utilizes a timer structure defined in \_src/utils/timerStructure. This structure allows for dynamic form inputs, enabling users to customize timer durations as needed.

<img src="./readme_imgs/timerStructure.PNG" width="400px">

For notification messages to function, the application requests permission from the browser. If permission is denied or not answered, the app resorts to using the alert Web API.

_src/context/index.jsx_

<img src="./readme_imgs/notification.PNG" width="400px">

When the user clicks the "Add Timer" button, the onAddTimer function validates the timer's time values. If the values are valid, a new timer is added with the specified time in seconds, and a corresponding notification message.

_src/context/index.jsx_

<img src="./readme_imgs/add.PNG" width="500px">

Timers can be deleted by their respective IDs, providing users with the flexibility to manage their timers.

_src/context/index.jsx_

<img src="./readme_imgs/delete.PNG" width="500px">

A useEffect hook is in place to monitor changes in time, isPaused, and isOver states. This hook initiates a countdown or notifies the user when the timer expires.

<img src="./readme_imgs/countdown-effect.PNG" width="500px">

Feel free to explore, customize, and enhance the application based on your requirements!
