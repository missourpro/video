import {BrowserWindow} from 'electron';
import * as fs from "fs";
import * as tmp from "tmp";
import {FrameHandler} from "./frame-handler";
export default class Renderer{
  private browserWindow:Electron.BrowserWindow;
  private static readonly DEFAULT_FRAME_RATE: number = 25;
  private framerate:number=Renderer.DEFAULT_FRAME_RATE;
  private frameHandler:FrameHandler;
  constructor(){

  }
  setFrameHandler(frameHandler:FrameHandler){
    this.frameHandler=frameHandler;
  }
  render(html:string){

    this.browserWindow = new BrowserWindowBuilder()
      .hide()
      .framerate(this.framerate)
      .background()
      .offscreen(this.paint.bind(this))
      .build();
    //TODO Figure out how to load data url (scripts and stylesheets are not loaded!!)
    this.browserWindow.loadURL(`file://${this.saveHtml(html)}`);
  }
  private paint(event, dirty, frame:Electron.NativeImage){
      //TODO Figure out how to make electron nativeFrame.toJPEG to work properly with ffmpeg
      this.frameHandler.frame(frame.toPNG());
  }

  private saveHtml(html:string) : string{
    let filePath=tmp.fileSync().name
    fs.appendFileSync(filePath, html);
    return filePath;
  }
}
class BrowserWindowBuilder{
  private options:Electron.BrowserWindowOptions=<Electron.BrowserWindowOptions>{};
  private fps:number=null;
  private offscreenListener:Function=null;
  constructor(){

  }
  hide(){
    this.options.show=false;
    return this;
  }
  offscreen(offscreenListener:Function){
    this.options.webPreferences.offscreen=true;
    this.offscreenListener=offscreenListener;
    return this;
  }
  background(){
    this.options.webPreferences.backgroundThrottling=false;
    return this;
  }
  framerate(fps){
    this.fps=fps;
    return this;
  }
  build(){
    const browserWindow=new BrowserWindow(this.options);
    if(this.fps!==null){
      browserWindow.webContents.setFrameRate(this.fps);
    }
    if(this.offscreenListener!== null){
      browserWindow.webContents.on('paint', this.offscreenListener);
    }
    return browserWindow;
  }
}
