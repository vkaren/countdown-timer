import React from "react";

function Input(props) {
  return (
    <div>
      <label htmlFor={props.timeType}></label>
      <input
        key={props.timeType}
        type="text"
        name={props.timeType}
        id={props.timeType}
        onInput={props.onInputTime}
        placeholder={
          props.timeType === "notification message"
            ? props.timeType
            : props.timeType[0] + props.timeType[0]
        }
      />
    </div>
  );
}

export default Input;
