import {Stoppable} from "./stoppable";
import Clock from "./clock";
import {ClockListener} from "./clock-listener";
export default class Stopper implements ClockListener{
  constructor(private stoppable: Stoppable, private clock: Clock){
    this.clock.setClockListener(this);
    this.clock.timeoutAfter(1000);
  }

  clockTimeout() {

  }

}
