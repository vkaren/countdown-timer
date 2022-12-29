import React from "react";
import Inputs from "./Inputs";
import Timer from "./Timer";

class App extends React.Component {
  state = {
    reset: true,
    hour: "00",
    min: "00",
    sec: "00",
    notification: "",
    timers: [],
    disabled: false,
  };

  componentDidMount() {
    if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.timers[0]) {
      const currentTimer = this.state.timers[0];

      if (currentTimer.time.join("") == 0) {
        document.title =
          currentTimer.notification.length > 0
            ? currentTimer.notification
            : `Timer ${currentTimer.index + 1} complete`;
      } else {
        document.title = currentTimer.time.join(":");
      }
    } else {
      document.title = "countdown timer";
    }

    if (prevState.timers.length !== this.state.timers.length) {
      let timers = this.state.timers.slice();
      timers.forEach((timer, i) => (timer.index = i));
      this.setState({ timers });
    }
  }

  componentWillUnmount() {
    let timers = this.state.timers.slice();

    timers.forEach((timer) => timer.stop());
  }

  onInputTime = (event) => {
    let value = event.currentTarget.value;
    let timeType = event.currentTarget.id;

    let timeNum = value ? (value - "" < 10 ? "0" + value : value) : "00";

    let hour = this.state.hour;
    let min = this.state.min;
    let sec = this.state.sec;
    let notification = this.state.notification;

    if (timeType === "hour") {
      hour = timeNum;
    } else if (timeType === "min") {
      min = timeNum;
    } else if (timeType === "sec") {
      sec = timeNum;
    } else {
      notification = value;
    }

    this.setState({ hour, min, sec, notification });

    if (isNaN(hour) || isNaN(min) || min > 59 || isNaN(sec) || sec > 59) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };

  add = () => {
    const time = [this.state.hour, this.state.min, this.state.sec];
    const notification = this.state.notification;
    let timers = this.state.timers.slice();
    const app = this;

    if (time.join("") == 0) {
      return false;
    }

    timers.push({
      index: timers.length - 1,
      originalTime: time,
      time,
      isPause: true,
      isOver: false,
      notification,
      start() {
        this.timeInterval = setInterval(() => {
          app.countdown(this.index);
        }, 1000);
      },
      stop() {
        clearInterval(this.timeInterval);
      },
    });

    if (timers.length === 1) {
      timers[0].isPause = false;
      timers[0].start(0);
    }

    this.setState({
      timers,
      reset: false,
      hour: "00",
      min: "00",
      sec: "00",
      notification: "",
    });
  };

  countdown = (currentTimer) => {
    let timers = this.state.timers.slice();
    let time = timers[currentTimer].time.slice();

    const notificationMessage =
      timers[currentTimer].notification.length > 0
        ? timers[currentTimer].notification
        : `Timer ${currentTimer + 1} complete`;

    for (let i = time.length - 1; i >= 0; i--) {
      if (time[i] > 0) {
        time[i] = time[i] - 1 < 10 ? `0${time[i] - 1}` : time[i] - 1;
        if (i < 2) {
          time[i + 1] = 59;
        }
        break;
      }
    }

    timers[currentTimer].time = time;

    if (time.join("") == 0) {
      if (
        !("Notification" in window) ||
        Notification.permission === "denied" ||
        Notification.permission === "default"
      ) {
        alert(notificationMessage);
      } else if (Notification.permission === "granted") {
        const notification = new Notification(notificationMessage);
      }
      timers[currentTimer].stop();
      timers[currentTimer].isPause = true;
      timers[currentTimer].isOver = true;
    }

    this.setState({ timers });
  };

  start = (currentTimer) => {
    let timers = this.state.timers.slice();

    timers[currentTimer].isPause = false;
    timers[currentTimer].start();

    this.setState({ timers });
  };

  pause = (currentTimer) => {
    let timers = this.state.timers.slice();

    timers[currentTimer].isPause = true;
    timers[currentTimer].stop();

    this.setState({ timers });
  };

  reset = (currentTimer) => {
    let timers = this.state.timers.slice();

    timers[currentTimer].isPause = true;
    timers[currentTimer].isOver = false;
    timers[currentTimer].stop();
    timers[currentTimer].time = timers[currentTimer].originalTime.slice();

    this.setState({ timers });
  };

  delete = (currentTimer) => {
    let timers = this.state.timers.slice();

    timers[currentTimer].stop();
    timers.splice(currentTimer, 1);

    if (timers.length === 0) {
      this.setState({
        reset: true,
      });
    }
    this.setState({ timers });
  };

  render() {
    return (
      <div className="timer">
        <h1>Countdown Timer</h1>
        <div>
          <Inputs
            onInputTime={this.onInputTime}
            hour={this.state.hour}
            min={this.state.min}
            sec={this.state.sec}
            notification={this.state.notification}
          />
          <button
            key={this.state.reset ? "start" : "add"}
            className={this.state.reset ? "start" : "add"}
            onClick={this.add}
            disabled={this.state.disabled}
          >
            {this.state.reset ? "Start" : "Add timer"}
          </button>
        </div>
        <div className="timers">
          {this.state.timers.map((timer, i) => (
            <Timer
              key={i + 1}
              index={i}
              time={timer.time}
              notification={timer.notification}
              isPause={timer.isPause}
              isOver={timer.isOver}
              start={this.start}
              pause={this.pause}
              delete={this.delete}
              reset={this.reset}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
