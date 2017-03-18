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
import {BotManufacturer} from "./bot-manufacturer";
import {BotRepository} from "./bot-repository";
import {BotId} from "./bot-id";
import {BotConfiguration} from "./bot-configuration";
@Service()
export default class BotFactory{
  constructor(private botManufacturer:BotManufacturer, private botRepository:BotRepository){

  }
  manufacture(configuration:BotConfiguration){
    let bot:Bot=this.botManufacturer.manufacture(configuration);
    this.botRepository.add(bot);
    return bot;
  }
  recycle(botId:BotId){
    this.botRepository.recycle(botId);
  }
  manufacturedBot(botId: BotId){
    return this.botRepository.find(botId);
  }
  manufacturedBots(){
    return this.botRepository.all();
  }
}
