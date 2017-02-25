import {ScraperListener} from "./scraper-listener";
import Page from "./page";
import {BrowserWindow} from 'electron';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import * as jsonfile from 'jsonfile';
export default class Scraper {
  private browserWindowOptions: Electron.BrowserWindowOptions;
  private browserWindow: Electron.BrowserWindow;

  constructor(private scraperListener: ScraperListener) {
    this.browserWindowOptions = <Electron.BrowserWindowOptions>{
      show: false
    };
    this.browserWindow = new BrowserWindow(this.browserWindowOptions);
  }

  scrape(uri: string) {
    this.browserWindow.loadURL(uri);
    //this.browserWindow.webContents.openDevTools();
    this.browserWindow.webContents.on('did-finish-load', () => {

      this.browserWindow.webContents.executeJavaScript(`
          function extract(){
            return document.querySelector('body').innerHTML;
          };
       extract();
      `, true, (html: string) => {
        let root = cheerio(html);
        let page: any = JSON.parse(fs.readFileSync(path.join(__dirname, 'hespress.json'), 'utf8'));
        let result: any = {};
        Object.keys(page).forEach(key => {
          if (typeof page[key] === 'string') {
            let element=root.find(page[key]);
            if(element.is('img')){
              result[key]=element.attr('src');
            } else {
              result[key] = element.text();
            }

          } else {
            let listSelector = page[key]['selector'];
            let itemSelector = page[key]['comment']['selector'];
            let item = Object.assign({},page[key]['comment']);
            delete item['selector'];
            result[key] = [];
            root.find(listSelector).find(itemSelector)
              .each((index, element) => {
              let child: any = {};
              Object.keys(item).forEach(key => {
                child[key] = cheerio(item[key], element).text();
              });
              result[key].push(child);
            });
          }
        });
        this.scraperListener.scraped(result);
      })


    });

  }
}
