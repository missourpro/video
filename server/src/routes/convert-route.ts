import {Route} from "./route";
import ElectronBrowser from "../electron-browser";
import FfmpegVideo from "../ffmpeg-video";
import Clock from "../clock";
import Converter from "../converter";
import {ConverterListener} from "../converter-listener";
import Renderer from "../renderer";
export default class ConvertRoute extends Route implements ConverterListener{
  route='/convert';
  method=Route.POST;
  handler=this.convert;

  convert(){
    console.log('converting');
    let converter: Converter=new Converter(this, new Renderer(), new Recorder(new Tape('path'));

    //TODO ensure html is not empty
    converter.convert(this.get('html'));
  }
  converted(): void {
    this.ok();
  }

}
