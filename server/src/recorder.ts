import {Video} from "./video";
import {FrameHandler} from "./frame-handler";
import {Stoppable} from "./stoppable";
import {RecorderListener} from "./recorder-listener";
import Config from "./config";
import * as path from "path";
import * as fs from "fs";
import CantStartFfmpegException from "./cant-start-ffmpeg-exception";
import CantRecordVideoException from "./cant-record-video-exception";
import Tape from "./tape";

export default class Recorder implements FrameHandler, Stoppable{

  private static readonly DEFAULT_FRAME_RATE: number=25;
  private static readonly DEFAULT_VIDEO_PATH: string=path.join(Config.STORAGE_PATH, 'video');

  private recorderListener: RecorderListener;
  constructor(private tape:Tape){
    try{

    }
    catch (exception){
      throw new CantRecordVideoException(exception.message);
    }

  }
  frame(frame: Buffer) {
    this.tape.record(frame)
    this.ffmpeg.addFrame(frame);
  }
  async stop(){
    await this.ffmpeg.end();
    this.recorderListener.recorded(new Video(this.videoPath));
  }


  setRecorderListener(recorderListener: RecorderListener) {
    this.recorderListener=recorderListener;
  }
}
