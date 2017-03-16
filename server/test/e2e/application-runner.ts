import * as electron from "electron";
import ConvertEndpoint from "./convert-endpoint";
import Config from "../../src/config";
const {app} = require('electron');
const fs = require("fs");
const path = require("path");
import Util from '../util';
import ScrapeEndpoint from "./scrape-endpoint";
import Server from "../../src/http-server";
import WatchEndpoint from "./watch-endpoint";
import FakeWebsite from "./fake-website";
export default class ApplicationRunner{
  private server:Server;
  private app:any;
  private convertEndpoint: ConvertEndpoint=new ConvertEndpoint();
  private scrapeEndpoint: ScrapeEndpoint=new ScrapeEndpoint();
  private watchEndpoint: WatchEndpoint=new WatchEndpoint;
  constructor(){
    this.server=new Server();
  }

  async start() {
    //TODO
    await Promise.resolve();
  }
  async stop() {
    //TODO
    await Promise.resolve();
  }
  async convertDynamicHtmlToVideo(html:string){
    await this.convertEndpoint.post(html);
  }
  async hasCreatedVideoContainingText(text:string){
    const VIDEO_PATH:string=path.resolve(Config.STORAGE_PATH, 'test.mp4');
    expect(VIDEO_PATH).toBeFile();

    let recognizedText=await Util.recognizeTextInVideo(VIDEO_PATH);

    expect(recognizedText).toContain(text);
    fs.unlinkSync(VIDEO_PATH);
  }


  showsWindowWithTitle(title:string) {

  }


  async scrapeWebpage(uri: string) {
    return await this.scrapeEndpoint.post(uri);

  }

  hasReceivedHtmlResponse(html: string) {

  }

  hasExtractedTextFromWebpage(text: string) {

  }

  watchWebsiteForChanges(uri:string) {
    return this.watchEndpoint.post(uri);
  }

  showsWebsiteChanged(uri: string) {

  }
}
