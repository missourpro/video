import Bot from "./bot";
import {Service} from "typedi";
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
