import {VideoListener} from "./video-listener";
export interface Video{
  getVideoListener():VideoListener;
  setVideoListener(videoListener: VideoListener);
  addFrame(frame:Buffer);
  end();
}
// export class MockVideo extends Video{
//
//   addFrame(frame:Buffer){
//
//   }
// }
