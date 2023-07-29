import { useContext } from "react";
import { AppContext } from "@context";
import removeIcon from "@icons/icon-remove.png";
import "./styles.css";

const Timer = ({ id, time, notifMessage, isPaused, isOver }) => {
  const { onDeleteTimer } = useContext(AppContext);
  const timeContent = Object.values(time)
    .map((num) => (num < 10 ? `0${num}` : num))
    .join(":");

  return (
    <article id={id} className={"timer__container"}>
      <button onClick={onDeleteTimer} className="timer__remove">
        <img src={removeIcon} alt="Remove timer" />
      </button>

      <div className="timer__content">
        <div className="timer_current-time">
          <span>{timeContent}</span>
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
