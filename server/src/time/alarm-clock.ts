import Timer = NodeJS.Timer;
import {AlarmClockListener} from "./alarm-clock-listener";
export class AlarmClock {

  private static STATE_UNKNOWN = 1;
  private static STATE_OFF = 2;
  private static STATE_ON = 3;
  private static TYPE_TIMEOUT = 1;
  private static TYPE_INTERVAL = 2;

  private itsListener: AlarmClockListener;
  private timer: Timer;
  private itsState: number;
  private itsType: number;
  private itsValue: number;


  constructor() {
    this.itsState = AlarmClock.STATE_UNKNOWN;
  }

  after(timeout: number, listener: AlarmClockListener) {
    this.turnOff();
    this.setListener(listener);
    this.itsType = AlarmClock.TYPE_TIMEOUT;
    this.itsValue = timeout;
    this.turnOn();

  }

  every(interval: number, listener: AlarmClockListener) {
    this.turnOff();
    this.setListener(listener);
    this.itsType = AlarmClock.TYPE_INTERVAL;
    this.itsValue = interval;
    this.turnOn();
  }

  turnOn() {
    switch (this.itsState) {
      case AlarmClock.STATE_OFF:
        switch (this.itsType) {
          case AlarmClock.TYPE_TIMEOUT:
            this.setCurrentTimeout(this.itsValue);
            break;
          case AlarmClock.TYPE_INTERVAL:
            this.setCurrentInterval(this.itsValue);
            break;
          default:
            throw new TypeError('Cant Turn alarm on');
        }
        break;
      default:
        throw new TypeError('Cant Turn alarm on');

    }
    this.itsState = AlarmClock.STATE_ON;
  }

  turnOff() {
    clearTimeout(this.timer);
    clearInterval(this.timer);
    this.itsState = AlarmClock.STATE_OFF;
  }

  private setListener(listener: AlarmClockListener) {
    this.itsListener = listener;
  }

  private setCurrentTimeout(timeout: number) {
    this.timer = global.setTimeout(this.notify.bind(this), timeout);

  }

  private setCurrentInterval(interval: number) {

    this.timer = global.setInterval(this.notify.bind(this), interval)
  }

  private notify() {
    this.itsListener.wakeUp();
  }

}
