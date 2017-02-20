import {ConverterListener} from "./converter-listener";
import {Browser} from "./browser";
import {Video} from "./video";
import {BrowserListener} from "./browser-listener";
import {VideoListener} from "./video-listener";
import Clock from "./clock";
import {ClockListener} from "./clock-listener";
export default class Converter implements BrowserListener, VideoListener, ClockListener{
  private static NO_FRAME_LEFT_TIMEOUT = 1000;
  constructor(private converterListener: ConverterListener, private browser: Browser, private video: Video,private clock: Clock){
    this.browser.setBrowserListener(this);
    this.video.setVideoListener(this);
    this.clock.setClockListener(this);

  }
  convert(html:string){
    this.browser.open(html);
  }

  browserPainted(frame: Buffer) {
    this.video.addFrame(frame);

    this.clock.timeoutAfter(Converter.NO_FRAME_LEFT_TIMEOUT);
  }
  videoEnded() {
    this.converterListener.converted();
  }
  clockTimeout(){
    this.video.end();
  }
}
