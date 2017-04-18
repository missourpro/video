import {Camera} from "./camera";
import {Scene} from "../scene";
export class Videographer{
  private scene:Scene;
  private camera:Camera;
  constructor(){

  }
  setScene(scene:Scene){
    this.scene=scene;
  }
  setCamera(camera:Camera){
    this.camera=camera;
  }
  record(){
    this.camera.record(this.scene);
  }

}
