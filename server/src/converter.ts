import {ConverterListener} from "./converter-listener";
import {Video} from "./video";
import Renderer from "./renderer";
import Recorder from "./recorder";
import {RecorderListener} from "./recorder-listener";
export default class Converter implements   RecorderListener{
  constructor(private converterListener: ConverterListener, private renderer: Renderer, private recorder: Recorder){
    this.renderer.setFrameHandler(this.recorder);
    this.recorder.setRecorderListener(this);
  }
  convert(html:string){
    this.renderer.render(html);
  }

  recorded(video) {
    this.converterListener.converted();
  }

}
