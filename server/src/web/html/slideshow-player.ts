import {Slideshow} from "./slideshow";
import BrowserWindow = Electron.BrowserWindow;
import * as path from "path";
import * as fs from "fs";
import Config from "../../config/index";
import NativeImage = Electron.NativeImage;
import {Frame} from "../../vision/photography/frame";
import {Scene} from "../../vision/scene";
export class SlideshowPlayer{
  private slideshow:Slideshow;
  private fps:number=25;
  private scene:Scene;
  private browserWindow:Electron.BrowserWindow;
  private static TO_BE_GARBAGE_COLLECTED: Electron.BrowserWindow = null;
  setFrameRate(fps:number){
    this.fps=fps;
  }


  constructor(scene: Scene){
    let browserWindowOptions=<Electron.BrowserWindowOptions>{
      show: false,
      experimentalFeatures: true,
      webPreferences: {
        offscreen: true,
        backgroundThrottling :false,
      }
    };
    this.browserWindow = new BrowserWindow(browserWindowOptions);
    this.browserWindow.webContents.setFrameRate(this.fps);
    this.notifyWhenPainEventReceivedFromBrowserWindow();

  }
  open(html: string) {
    //TODO Create a unique filename
    let slideshowPath=path.join(Config.STORAGE_PATH, 'slideshow.html');
    let slideshowUri=`file://${slideshowPath}`;
    //TODO Delete Temporary saved file
    fs.writeFileSync(slideshowPath, html);
    this.browserWindow.loadURL(slideshowUri);
    //this.browserWindow.show();
    //TODO Figure out how to use data url  instead(scripts and stylesheets are not loaded!!)
    // this.browserWindow.loadURL("data:text/html;charset=utf-8,"+encodeURI(html));
  }
  stop() {
    this.browserWindow.close();
    this.browserWindow.on('closed',()=>{
      this.browserWindow=SlideshowPlayer.TO_BE_GARBAGE_COLLECTED;
    });
  }

  private notifyWhenPainEventReceivedFromBrowserWindow() {
    this.browserWindow.webContents.on('paint', (event, dirty, frame:NativeImage)=>{
      //TODO Figure out how to make electron nativeFrame.toJPEG to work properly with ffmpeg
      this.scene.draw(Frame.fromPng(frame.toPNG()))
    });
  }


}
