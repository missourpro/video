import {Browser} from "./browser";
import {BrowserListener} from "./browser-listener";
import {BrowserWindow} from 'electron';
import NativeImage = Electron.NativeImage;
import Config from "./config";
import * as path from "path";
import * as fs from "fs";
export default class ElectronBrowser implements Browser{
  private browserWindow:Electron.BrowserWindow;

  private browserWindowOptions:Electron.BrowserWindowOptions;
  private static TO_BE_GARBAGE_COLLECTED: Electron.BrowserWindow = null;
  private browserListener: BrowserListener;
  private static FRAME_RATE: number = 25;
  private static UNUSED_FRAME: Buffer;
  constructor(){
    ElectronBrowser.UNUSED_FRAME=fs.readFileSync(Config.STORAGE_PATH+'/hello-world.jpeg')
    this.browserWindowOptions=<Electron.BrowserWindowOptions>{
      show: false,
      experimentalFeatures: true,
      webPreferences: {
        offscreen: true,
        backgroundThrottling :false,
      }
    };
    this.browserWindow = new BrowserWindow(this.browserWindowOptions);
    this.browserWindow.webContents.setFrameRate(ElectronBrowser.FRAME_RATE);
    this.notifyWhenPainEventReceivedFromBrowserWindow();

  }
  getBrowserListener(): BrowserListener {
    return this.browserListener;
  }
  setBrowserListener(browserListener: BrowserListener) {
    this.browserListener=browserListener;
  }

  open(html: string) {
    //TODO Create a unique filename
    let slideshowPath=path.join(Config.STORAGE_PATH, 'slideshow.html');
    let slideshowUri=`file://${slideshowPath}`;
    //TODO Delete Temporary saved file
    fs.writeFileSync(slideshowPath, html);
    this.browserWindow.loadURL(slideshowUri);
    this.browserWindow.show();
    //TODO Figure out how to use data url  instead(scripts and stylesheets are not loaded!!)
    // this.browserWindow.loadURL("data:text/html;charset=utf-8,"+encodeURI(html));
  }

  close() {
    this.browserWindow.close();
    this.browserWindow.on('closed',()=>{
      this.browserWindow=ElectronBrowser.TO_BE_GARBAGE_COLLECTED;
    });
  }

  private notifyWhenPainEventReceivedFromBrowserWindow() {
    this.browserWindow.webContents.on('paint', (event, dirty, frame:NativeImage)=>{
      //TODO Figure out how to make electron nativeFrame.toJPEG to work properly with ffmpeg
      this.browserListener.browserPainted(frame.toPNG());
    });
  }

}
