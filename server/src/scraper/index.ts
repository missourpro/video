
import {ScraperListener} from "./scraper-listener";
import {Page} from "./page";
import {Browser} from "../browser";
import {BrowserListener} from "../browser-listener";
import {BrowserWindow} from 'electron';
export default class Scraper{
  private browserWindowOptions:Electron.BrowserWindowOptions;
  private browserWindow:Electron.BrowserWindow;
  constructor(private scraperListener:ScraperListener ){
    this.browserWindowOptions=<Electron.BrowserWindowOptions>{
      show: false,
      experimentalFeatures: true
    };
    this.browserWindow = new BrowserWindow(this.browserWindowOptions);
  }
  scrape(uri:string){
    this.browserWindow.loadURL(uri);
    //this.browserWindow.webContents.openDevTools();
    this.browserWindow.webContents.on('did-finish-load', ()=>{

      this.browserWindow.webContents.executeJavaScript(`
      console.dir(document.querySelector(".page_title"))
          function extract(){
            //
            return  {
              title: document.querySelector(".page_title").outerText,
              body: document.querySelector("#article_body").outerText
            };
          };
       extract();
      `, true, (page)=>{
        this.scraperListener.scraped(page);
      })




    });

  }
}
