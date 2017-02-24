import {Ffmpeg, FfmpegBuilder} from "./ffmpeg";
import Recorder from "./recorder";
export default class Tape{
  private ffmpeg:Ffmpeg;
  private framerate:number=25;
  constructor(private path:string){
    this.ffmpeg=new FfmpegBuilder()
      .overwrite()
      .input('-')
      .imageToPipe()
      .framerate(this.framerate)
      .output(path)
      .build();
  }
  record(frame:Buffer){
    this.ffmpeg.write(frame);
  }

}
