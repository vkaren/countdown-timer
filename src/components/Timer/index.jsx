import "./styles.css";

const Timer = ({ time, notifMessage, isPaused, isOver }) => {
  return (
    <article className={"timer__container"}>
      <div className="timer__content">
        <div className="timer_current-time">
          <span>{time}</span>
        </div>

        <div className="timer_notif-mssg">
          <span>{notifMessage}</span>
        </div>
      </div>

      {isPaused ? (
        <div className="timer__on-pause-btn">
          <button className="timer_start-btn">Start</button>
        </div>
      ) : (
        <div className="timer__on-start-btns">
          <button className="timer_pause-btn">Pause</button>
          <button className="timer_reset-btn">Reset</button>
        </div>
      )}
    </article>
  );
};

export default Timer;
