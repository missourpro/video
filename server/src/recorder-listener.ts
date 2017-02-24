import {Video} from "./video";
export interface RecorderListener{
  recorded(video:Video);
}
