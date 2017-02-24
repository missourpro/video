import {Ffmpeg, FfmpegBuilder} from "./ffmpeg";
import Recorder from "./recorder";
export default class Tape{
  private ffmpeg:Ffmpeg;
  private framerate:number=Recorder.DEFAULT_FRAME_RATE;
  constructor(private path:string){
    this.ffmpeg=new FfmpegBuilder()
      .overwrite()
      .input('-')
      .imageToPipe()
      .framerate(this.framerate)
      .output(this.videoPath)
      .build();
  }
  record(frame:Buffer){
    this.ffmpeg.write(frame);
  }

}
