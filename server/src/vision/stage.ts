import {Scene} from "./scene";
export class Stage{
  private scenes:Array<Scene>;
  setScene(scene:Scene){
    this.scenes.push(scene);
  }
  getScene(){
    return this.scenes[this.scenes.length-1]
  }
}
