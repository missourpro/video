import {Route} from "./route";
import ElectronBrowser from "../electron-browser";
import FfmpegVideo from "../ffmpeg-video";
import Clock from "../clock";
import Converter from "../converter";
import {ConverterListener} from "../converter-listener";
export default class ConvertRoute extends Route implements ConverterListener{
  route='/convert';
  method=Route.POST;
  handler=this.convert;

  convert(){
    console.log('converting');
    let converter: Converter=new Converter(this,new ElectronBrowser(), new FfmpegVideo(), new Clock());
    //TODO ensure html is not empty
    converter.convert(this.get('html'));
  }
  converted(): void {
    this.json({'path':'test.mp4'});
  }

}
