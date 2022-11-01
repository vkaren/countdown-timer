import React from "react";
import Input from "./Input";

function Inputs(props) {
  return (
    <div className="inputs">
      <div className="inputs-time">
        <Input timeType="hour" onInputTime={props.onInputTime} />
        <span>:</span>
        <Input timeType="min" onInputTime={props.onInputTime} />
        <span>:</span>
        <Input timeType="sec" onInputTime={props.onInputTime} />
      </div>
      <Input timeType="notification message" onInputTime={props.onInputTime} />
    </div>
  );
}

export default Inputs;
