import React from "react";
import Input from "./Input";

function Inputs(props) {
  return (
    <div className="inputs">
      <div className="inputs-time">
        <Input
          timeType="hour"
          onInputTime={props.onInputTime}
          value={props.hour}
        />
        <span>:</span>
        <Input
          timeType="min"
          onInputTime={props.onInputTime}
          value={props.min}
        />
        <span>:</span>
        <Input
          timeType="sec"
          onInputTime={props.onInputTime}
          value={props.sec}
        />
      </div>
      <Input
        timeType="notification message"
        onInputTime={props.onInputTime}
        value={props.notification}
      />
    </div>
  );
}

export default Inputs;
