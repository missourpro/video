import {Capturable} from "./capturable";
export default class Recorder{
  static readonly DEFAULT_FRAME_RATE: number=25;
  private fps:number=Recorder.DEFAULT_FRAME_RATE;
  constructor(fps:number){
    this.fps=fps;
  }
  record(what: Capturable, duration:number){
    let frames:Array<Buffer>=[];
    let interval=setInterval(()=>{
      frames.push(what.capture());
      let timeElapsed:number=frames.length*1000/this.fps;
      if(timeElapsed>= duration){
        clearInterval(interval);
      }
    }, 1000/this.fps);

  }
}
