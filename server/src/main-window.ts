import {BrowserWindow} from 'electron';
export default class MainWindow {
  private url:string='http://localhost:8100';
  private browserWindow: Electron.BrowserWindow;
  static TO_BE_GARBAGE_COLLECTED=null;
  constructor(){
    this.browserWindow=new BrowserWindow({
      width: 900,
      height: 600
    });
    // let args = process.argv.slice(2);
    // Args.forEach(function (val) {
    //   if (val === "dist") {
    //     this.url = 'file://' + __dirname + '/www/index.html'
    //   }
    // });
    this.browserWindow.loadURL(this.url);
    this.browserWindow.webContents.openDevTools();
    this.browserWindow.on('closed', ()=>{
      this.browserWindow=MainWindow.TO_BE_GARBAGE_COLLECTED;
    });
  }

}
