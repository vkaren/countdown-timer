import DotsIcon from "../DotsIcon";
import "./styles.css";

const TimerFormInputs = ({ timerFormInputs }) => {
  return (
    <div className="adf__inputs-timer">
      {timerFormInputs.map((timerInput, i) => {
        const input = (
          <input
            key={timerInput}
            type="text"
            name={timerInput}
            id={timerInput}
            className="adf_input-timer"
            placeholder={`${timerInput[0]}${timerInput[0]}`}
            pattern="[0-9]"
            maxLength="2"
            inputMode="numeric"
            autoComplete="off"
            aria-label={`${timerInput} input`}
          />
        );

        if (i !== timerFormInputs.length - 1) {
          return [input, <DotsIcon key={`dots-${timerInput}`} />];
        }
        return input;
      })}
    </div>
  );
};

export default TimerFormInputs;
