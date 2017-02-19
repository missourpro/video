import * as electron from "electron";
import ConvertEndpoint from "./convert-endpoint";
import Config from "../../src/config";
const {Application} = require('spectron');
const fs = require("fs");
const path = require("path");
import Util from '../util';
import ScrapeEndpoint from "./scrape-endpoint";
export default class ApplicationRunner{
  private app:any;
  private convertEndpoint: ConvertEndpoint=new ConvertEndpoint();
  private scrapeEndpoint: ScrapeEndpoint=new ScrapeEndpoint();
  constructor(){
    this.app = new Application({
      path: electron,
      args: ['.']
    });
  }

  async start() {
    await this.app.start().then(() => {
      return this.app.client.waitUntilWindowLoaded()
              .browserWindow.focus();//windowByIndex(1).browserWindow.focus();
    });
  }
  async stop() {
    await this.app.stop();
  }
  async convertDynamicHtmlToVideo(html:string){
    await this.convertEndpoint.post(html);
  }
  async hasCreatedVideoContainingText(text:string){
    const VIDEO_PATH:string=path.resolve(Config.STORAGE_PATH, 'test.mp4');
    expect(VIDEO_PATH).toBeFile();

    let recognizedText=await Util.recognizeTextInVideo(VIDEO_PATH);

    expect(recognizedText).toContain(text);
    //fs.unlinkSync(VIDEO_PATH);
  }


  hasWindowWithTitle(title:string) {

  }


  async scrapeWebpage(uri: string) {
    await this.scrapeEndpoint.post(uri);

  }

  hasReceivedHtmlResponse(html: string) {

  }

  hasExtractedTextFromWebpage(text: string) {

  }
}
