import { useState } from "react";
import TimerFormInputs from "@components/TimerFormInputs";
import "./styles.css";

const AddTimerForm = ({ timerFormInputs }) => {
  // For mobile devices
  const [isOnMobile, setIsOnMobile] = useState(window.innerWidth <= 785);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onToggleAddTimerModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeAddTimerModal = () => {
    setIsModalOpen(false);
  };
  const onWindowResize = () => {
    setIsOnMobile(window.innerWidth <= 785);
  };
  window.addEventListener("resize", onWindowResize);

  return (
    <>
      <section
        className={`add-timer-form__section ${
          isOnMobile && !isModalOpen ? "hidden" : ""
        }`}
      >
        <form className="add-timer-form">
          <TimerFormInputs timerFormInputs={timerFormInputs} />

          <input
            type="text"
            name="notif-message"
            id="notif-message"
            className="adf__input-notif"
            placeholder="notification message"
            autoComplete="off"
            aria-label="notification message input"
          />
          <button className="adf__add-timer-btn">Add timer</button>
        </form>
      </section>

      {isOnMobile && (
        <button className="open-modal" onClick={onToggleAddTimerModal}>
          +
        </button>
      )}
      {isOnMobile && isModalOpen && (
        <div className="overlay" onClick={closeAddTimerModal}></div>
      )}
    </>
  );
};

export default AddTimerForm;
