import React from "react";

class Timer extends React.Component {
  render() {
    return (
      <div className="time" key={this.props.currTimer}>
        <div>
          <button
            className="delete"
            onClick={() => this.props.delete(this.props.currTimer)}
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
              onClick={() => this.props.reset(this.props.currTimer)}
            >
              Reset
            </button>
          ) : (
            <button
              className="start"
              onClick={() => this.props.start(this.props.currTimer)}
            >
              Start
            </button>
          )
        ) : (
          [
            <button
              key="pause"
              className="pause"
              onClick={() => this.props.pause(this.props.currTimer)}
            >
              Pause
            </button>,
            <button
              key="reset"
              className="reset"
              onClick={() => this.props.reset(this.props.currTimer)}
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
