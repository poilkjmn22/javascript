import React from "react";
import AnalogDisplay from "./analog-display.jsx";
import DigitalDisplay from "./digital-display.jsx";

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.launchClock();
    const now = new Date();
    this.state = {
      currentTime: now.toLocaleString(),
      currentDateTime: now,
    };
  }
  launchClock() {
    setInterval(() => {
      console.log("Updating...");
      const now = new Date();
      this.setState({
        currentTime: now.toLocaleString(),
        currentDateTime: now,
      });
    }, 1000);
  }
  render() {
    console.log("Rendering...");
    return (
      <div>
        <AnalogDisplay time={this.state.currentDateTime} />
        <DigitalDisplay time={this.state.currentTime} />
      </div>
    );
  }
}
