import Converter from "../converter";
import ElectronBrowser from "../electron-browser";
import FfmpegVideo from "../ffmpeg-video";
import Clock from "../clock";
import {ConverterListener} from "../converter-listener";
import {Route} from "./route";
export default class ConvertRoute extends Route implements ConverterListener {
  converted(){
    this.send({path:'test'});
  }
  handle(){
    console.log('converting');
    let converter: Converter=new Converter(this, new ElectronBrowser(), new FfmpegVideo(), new Clock());
    converter.convert(this.get('html'));
  }
}
