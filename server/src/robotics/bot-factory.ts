import Bot from "./bot";
import Watcher from "../watcher/watcher";
import Client from "../watcher/client";
import History from "../watcher/history";
import Scraper from "../scraper/scraper";
import Transformer from "../transformer/transformer";
import {Paragraphizer} from "../transformer/paragraphizer";
import Converter from "../converter";
import FfmpegVideo from "../ffmpeg-video";
import ElectronBrowser from "../electron-browser";
import Clock from "../clock";
import {Connection, createConnection, getConnectionManager} from "typeorm";
import Config from "../config/index";
import * as path from "path";
import {Service} from "typedi";
import {ManufacturedBotState} from "./states/manufactured-bot-state";
@Service()
export default class BotFactory{
  private connection:Connection;
   constructor(){
  }
  async open():Promise<void>{
    this.connection=await createConnection({
      driver: {
        type: "sqlite",
        storage: Config.DATABASE_PATH
      },
      entities: [Bot],
      autoSchemaSync: true
    });
  }
  async close():Promise<void>{
    await this.connection.close();
  }
  async manufacture(configuration:{uri:string}):Promise<Bot>{
    console.log('manufacturing bot');
    let bot:Bot=new Bot();
    bot.setState(new ManufacturedBotState);
    bot.configure(configuration);
    await this.connection.getRepository(Bot).persist(bot);
    console.log('bot manufactured and configured');
    return bot;
  }
  manufacturedBot(id:number):Promise<Bot>{
    return this.connection.getRepository(Bot).findOneById(id);
  }
  async recycle(bot:Bot):Promise<void>{
    if(bot.isRunning()){
      bot.stop();
    }
    await this.connection.getRepository(Bot).remove(bot);
    bot.destroy();
    console.log('bot destroyed');
  }
  manufacturedBots():Promise<Bot[]>{
    return this.connection.getRepository(Bot).find();
  }
}
