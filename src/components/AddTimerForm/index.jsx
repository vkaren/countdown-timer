import { createRef, useContext, useState } from "react";
import { AppContext } from "@context";
import TimerFormInputs from "@components/TimerFormInputs";
import "./styles.css";

const AddTimerForm = () => {
  const { addTimer } = useContext(AppContext);
  const formRef = createRef();

  // For mobile devices
  const [isOnMobile, setIsOnMobile] = useState(window.innerWidth <= 785);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onToggleAddTimerModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onWindowResize = () => {
    setIsOnMobile(window.innerWidth <= 785);
  };
  window.addEventListener("resize", onWindowResize);

  const onClickAddTimer = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const hour = formData.get("hour");
    const minute = formData.get("minute");
    const second = formData.get("second");
    const notifMssg = formData.get("notif-message");

    const timer = { hour, minute, second };

    addTimer({ timer, notifMssg });
    onToggleAddTimerModal();
    formRef.current.reset();
  };

  return (
    <>
      <section
        className={`add-timer-form__section ${
          isOnMobile && !isModalOpen ? "hidden" : ""
        }`}
      >
        <form ref={formRef} className="add-timer-form">
          <TimerFormInputs />

          <input
            type="text"
            name="notif-message"
            id="notif-message"
            className="adf__input-notif"
            placeholder="notification message"
            autoComplete="off"
            aria-label="notification message input"
          />

          <button onClick={onClickAddTimer} className="adf__add-timer-btn">
            Add timer
          </button>
        </form>
      </section>

      {isOnMobile && (
        <button className="open-modal" onClick={onToggleAddTimerModal}>
          +
        </button>
      )}
      {isOnMobile && isModalOpen && (
        <div className="overlay" onClick={onToggleAddTimerModal}></div>
      )}
    </>
  );
};

export default AddTimerForm;
