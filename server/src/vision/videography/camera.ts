import {Frame} from "../photography/frame";
import {Scene} from "../scene";
export class Camera{
  private fps:number;

  setFrameRate(fps:number){
    this.fps=fps;
  }
  record(scene:Scene){
    let frame:Frame=scene.see();
  }
}
