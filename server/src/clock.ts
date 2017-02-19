import {ClockListener} from "./clock-listener";
import Timer = NodeJS.Timer;
export default class Clock {
  private timer: Timer;
  private clockListener:ClockListener
  constructor() {
  }
  setClockListener(clockListener:ClockListener){
    this.clockListener=clockListener;
  }
  timeoutAfter(time: number) {
    this.clearAnyPreviousTimeout();
    this.setCurrentTimeout(time);
  }
  private clearAnyPreviousTimeout() {
      global.clearTimeout(this.timer);
  }

  private setCurrentTimeout(time: number) {
    this.timer=global.setTimeout(this.clockListener.clockTimeout.bind(this.clockListener), time);
  }
}
