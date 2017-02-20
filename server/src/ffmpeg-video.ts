import {Video} from "./video";
import {VideoListener, NullVideoListener} from "./video-listener";
import * as ChildProcess from "child_process";
import Config from "./config";
import * as path from "path";
import * as fs from "fs";

export default class FfmpegVideo implements Video {
  private videoListener: VideoListener=new NullVideoListener();
  static VIDEO_PATH: string = path.join(Config.STORAGE_PATH, 'test.mp4');
  static FRAME_RATE: number=25;
  static FFMPEG_PATH: string = Config.FFMPEG_PATH;
  private error: string='';
  private ffmpeg;
  constructor() {

    let args = [
      '-y',
      '-f', 'image2pipe',
      '-r', ''+ (+FfmpegVideo.FRAME_RATE),
      '-i', '-',
      FfmpegVideo.VIDEO_PATH
    ];
    this.ffmpeg = ChildProcess.spawn(FfmpegVideo.FFMPEG_PATH, args);
    //TODO Failure handling not implemented
    // Some errors triggered by ffmpeg
    // ( ffmpeg process: "pipe:0: End of file")
    this.ffmpeg.on('error', ()=>{
      throw Error('Failed to start ffmpeg process');
    });
    this.ffmpeg.stderr.on('data', (data)=>{
      this.error+=data;
    });
    this.ffmpeg.stderr.on('end', (data)=>{
      if(this.error.length>0){
        //throw  Error('ffmpeg stderr: '+this.error);
      }

    });

  }

  getVideoListener(): VideoListener {
    return this.videoListener;
  }

  setVideoListener(videoListener: VideoListener) {
    this.videoListener = videoListener;
  }

  addFrame(frame: Buffer) {
    //fs.writeFileSync(FfmpegVideo.VIDEO_PATH+'.jpg', frame);

      this.ffmpeg.stdin.write(frame);
      //   this.frameCount++;
      //   if(this.frameCount===40){
      //     this.frameAdded();
      //   }
      //   else{
      //     this.addFrame(frame);
      //   }
      //
      // });
  }


  end() {

    let end=(resolve, reject)=>{
        this.ffmpeg.stdin.end();
        this.ffmpeg.on('exit',  ()=>{
          this.videoListener.videoEnded();
          resolve();
        });

    };

    return new Promise(end)
  }

  private frameAdded() {
    this.ffmpeg.stdin.end();
  }
}
