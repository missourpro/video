import ApplicationRunner from "../e2e/application-runner";
import {Video} from "../../src/video";
import FfmpegVideo from "../../src/ffmpeg-video";
import {VideoListener} from "../../src/video-listener";
import * as fs from "fs";
import * as path from "path";
import Util from '../util';

jasmine.DEFAULT_TIMEOUT_INTERVAL=30000;
describe('FfmpegVideo', () => {
  const UNUSED_FRAME = new Buffer(0);
  let HELLO_WORLD_FRAME:Buffer=new Buffer(fs.readFileSync(path.join(__dirname, '/fixtures/hello-world.jpeg')));
  const VIDEO_PATH:string=FfmpegVideo.VIDEO_PATH;
  beforeEach(async ()=> {
  });
  afterEach(async ()=> {

  });
  it('notifiesWhenVideoEnds',async ()=>{
    try{
      let videoListener:VideoListener=jasmine.createSpyObj<VideoListener>('videoListener', ['videoEnded'])
      let video:Video =new FfmpegVideo();
      video.setVideoListener(videoListener);
      video.addFrame(UNUSED_FRAME);
      await video.end();
      expect(videoListener.videoEnded).toHaveBeenCalled();
    }
    catch (exception){
      console.error(exception.stack);
      throw exception;
    }


  });
  it('addsFrame',async ()=>{
    try{
      let video:Video =new FfmpegVideo();
      for(let i=0; i<10; i++){
        video.addFrame(HELLO_WORLD_FRAME);
      }
      await video.end();
      let textInVideo=await Util.recognizeTextInVideo(VIDEO_PATH);
      expect(textInVideo).toContain('hello world')
      //fs.unlinkSync(VIDEO_PATH);
    }
    catch (exception){
      console.error(exception.stack);
      throw exception;
    }


  });
});
