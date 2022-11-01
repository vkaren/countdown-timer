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
    timer: {},
    clicksAdd: 0,
    disabled: false,
  };
  componentDidMount() {
    if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }
  componentDidUpdate() {
    if (this.state.timer[Object.keys(this.state.timer)[0]]) {
      const currentTimer = this.state.timer[Object.keys(this.state.timer)[0]];
      if (currentTimer.time.join("") == 0) {
        document.title =
          currentTimer.notification.length > 0
            ? currentTimer.notification
            : `Timer ${Object.keys(this.state.timer)[0]} complete`;
      } else {
        document.title = currentTimer.time.join(":");
      }
    } else {
      document.title = "countdown timer";
    }
  }
  onInputTime = (event) => {
    const timeType = event.currentTarget.id;
    const timeNum = event.currentTarget.value
      ? event.currentTarget.value - "" < 10
        ? "0" + event.currentTarget.value
        : event.currentTarget.value
      : "00";
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
      notification = event.currentTarget.value;
    }
    this.setState({ hour, min, sec, notification });

    if (isNaN(hour) || isNaN(min) || min > 59 || isNaN(sec) || sec > 59) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };

  countdown = (currTimer) => {
    let timer = this.state.timer;
    let time = timer[currTimer].time.slice();
    const notificationMessage =
      timer[currTimer].notification.length > 0
        ? timer[currTimer].notification
        : `Timer ${currTimer} complete`;

    if (time[2] > 0) {
      time[2] = time[2] - 1 < 10 ? "0" + (time[2] - 1) : time[2] - 1;
    } else if (time[1] > 0) {
      time[1] = time[1] - 1 < 10 ? "0" + (time[1] - 1) : time[1] - 1;
      time[2] = 59;
    } else if (time[0] > 0) {
      time[0] = time[0] - 1 < 10 ? "0" + (time[0] - 1) : time[0] - 1;
      time[1] = 59;
    }

    timer[currTimer].time = time;

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
      timer[currTimer].stop();
      timer[currTimer].isPause = true;
      timer[currTimer].isOver = true;
    } else {
      timer[currTimer].start();
    }
    this.setState({ timer });
  };

  start = (currTimer) => {
    let timer = this.state.timer;
    timer[currTimer].isPause = false;
    timer[currTimer].start();
    this.setState({ timer });
  };

  pause = (currTimer) => {
    let timer = this.state.timer;
    timer[currTimer].isPause = true;
    timer[currTimer].stop();
    this.setState({ timer });
  };

  reset = (currTimer) => {
    let timer = this.state.timer;
    timer[currTimer].isPause = true;
    timer[currTimer].isOver = false;
    timer[currTimer].stop();
    timer[currTimer].time = timer[currTimer].originalTime.slice();

    this.setState({ timer });
  };

  add = () => {
    const time = [this.state.hour, this.state.min, this.state.sec];
    const notification = this.state.notification;
    let timer = this.state.timer;
    let clicksAdd = this.state.clicksAdd;

    if (time.join("") == 0) {
      return false;
    }
    clicksAdd++;

    timer[clicksAdd] = {
      originalTime: time.slice(),
      time,
      isPause: true,
      isOver: false,
      notification,
      start: () => {
        timer[clicksAdd].timeOut = setTimeout(
          () => this.countdown(clicksAdd + ""),
          1000
        );
      },
      stop: () => {
        clearTimeout(timer[clicksAdd].timeOut);
      },
    };

    if (clicksAdd === 1) {
      timer[clicksAdd].isPause = false;
      timer[clicksAdd].start();
    }

    document.querySelectorAll("input").forEach((input) => (input.value = ""));

    this.setState({
      timer,
      reset: false,
      clicksAdd,
      hour: "00",
      min: "00",
      sec: "00",
      notification: "",
    });
  };

  delete = (currTimer) => {
    let timer = this.state.timer;

    timer[currTimer].stop();
    delete timer[currTimer];

    if (Object.keys(timer).length === 0) {
      this.setState({
        reset: true,
        clicksAdd: 0,
      });
    }
    this.setState({ timer });
  };

  render() {
    return (
      <div className="timer">
        <h1>Countdown Timer</h1>
        <div>
          <Inputs onInputTime={this.onInputTime} />
          {this.state.reset ? (
            <button
              key="start"
              className="start"
              onClick={this.add}
              disabled={this.state.disabled}
            >
              Start
            </button>
          ) : (
            <button
              key="add"
              className="add"
              onClick={this.add}
              disabled={this.state.disabled}
            >
              Add timer
            </button>
          )}
        </div>
        <div className="timers">
          {Object.keys(this.state.timer).map((currTimer) => (
            <Timer
              key={currTimer}
              time={this.state.timer[currTimer].time}
              notification={this.state.timer[currTimer].notification}
              isPause={this.state.timer[currTimer].isPause}
              isOver={this.state.timer[currTimer].isOver}
              currTimer={currTimer}
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
