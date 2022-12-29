import React from "react";

class Timer extends React.Component {
  render() {
    return (
      <div className="time">
        <div>
          <button
            className="delete"
            onClick={() => this.props.delete(this.props.index)}
          >
            x
          </button>
          {this.props.notification.length > 0 ? (
            <p>{this.props.notification}</p>
          ) : null}
        </div>

        <p>{this.props.time.join(":")}</p>

        {this.props.isPause ? (
          this.props.isOver ? (
            <button
              className="reset"
              onClick={() => this.props.reset(this.props.index)}
            >
              Reset
            </button>
          ) : (
            <button
              className="start"
              onClick={() => this.props.start(this.props.index)}
            >
              Start
            </button>
          )
        ) : (
          [
            <button
              key="pause"
              className="pause"
              onClick={() => this.props.pause(this.props.index)}
            >
              Pause
            </button>,
            <button
              key="reset"
              className="reset"
              onClick={() => this.props.reset(this.props.index)}
            >
              Reset
            </button>,
          ]
        )}
      </div>
    );
  }
}

export default Timer;
