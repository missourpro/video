import {Frame} from "./photography/frame";
export class Scene{
  private itsFrame:Frame;
  see():Frame{
    return this.itsFrame;
  }
  draw(frame:Frame){
    this.itsFrame=frame;
  }
}
