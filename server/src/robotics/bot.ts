import Watcher from "../watcher/watcher";
import Scraper from "../scraper/scraper";
import Transformer from "../transformer/transformer";
import Converter from "../converter";
import {ScraperListener} from "../scraper/scraper-listener";
import {WatcherListener} from "../watcher/watcher-listener";
import {ConverterListener} from "../converter-listener";
import {BotListener} from "./bot-listener";
import {BotState} from "./bot-state";
import {StartedBotState} from "./states/started-bot-state";
import Client from "../watcher/client";
import {Paragraphizer} from "../transformer/paragraphizer";
import History from "../watcher/history";
import FfmpegVideo from "../ffmpeg-video";
import ElectronBrowser from "../electron-browser";
import Clock from "../clock";
import {BotId} from "./bot-id";

export default class Bot implements WatcherListener, ScraperListener, ConverterListener{
  private id:BotId;
  private uri: string;
  private state:BotState;
  private botListener:BotListener;
  private watcher:Watcher;
  private scraper:Scraper;
  private transformer:Transformer;
  private converter:Converter;
  constructor(){
    this.watcher=new Watcher(new Client(), new History());
    this.scraper=new Scraper();
    this.transformer=new Transformer(new Paragraphizer());
    this.converter=new Converter(new ElectronBrowser(),new  FfmpegVideo(), new Clock());
    this.scraper.setScraperListener(this);
    this.watcher.setWatcherListener(this);
    this.converter.setConverterListener(this);
  }
  getId():BotId{
    return this.id;
  }
  setBotListener(botListener:BotListener):void{
    this.botListener=botListener;
  }
  private watch(uri:string):void{
    this.setState(this.state.configure());
    this.uri=uri;
  }
  start():void{
    this.state=this.state.start();
    this.watcher.watch(this.uri);
  }
  stop():void{
    this.setState(this.state.stop());
    this.watcher.stop();
  }
  websiteChanged(uri: string):void {
    this.scraper.scrape(this.uri);
  }

  scraped(page: any):void {
    this.converter.convert(this.transformer.transform(page));
  }

  converted(): void {
    this.botListener.videoCreated();
  }

  isRunning() :boolean{
    //TODO promote equality to level state class: BotState
    return this.state instanceof StartedBotState;
  }

  destroy():void {
    this.setState(this.state.destroy());
  }
  setState(state:BotState):void{
    this.state=state;
  }

  serialize():string{
    return JSON.stringify({
      id: ''+this.id,
      uri: this.uri,
      state: ''+this.state
    });
  }

  getUri() {
    return this.uri;
  }

  configure(configuration: {uri: string}) {
    this.watch(configuration.uri);
  }


  setId(botId: BotId) {
    this.id=botId;
  }
}
