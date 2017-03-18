import Bot from "./bot";
import {BotId} from "./bot-id";
import {BotNotFoundException} from "./exceptions/bot-not-found-exception";
import {Service} from "typedi";
@Service()
export class BotRepository{
  private bots:Set<Bot>= new Set<Bot>();
  add(bot:Bot){
    this.bots.add(bot);
  }

  find(botId:BotId){
    let found:Bot=Array.from(this.bots).find((bot)=>{
      return bot.getId().equals(botId);
    });
    if(found) return found;
    throw new BotNotFoundException(''+botId);
  }
  all():Array<Bot>{
    return Array.from(this.bots.values());
  }
  recycle(botId: BotId){
    let bot:Bot=this.find(botId);
    if(bot.isRunning()){
      bot.stop();
    }
    this.bots.delete(bot);
    bot.destroy();
    console.log('bot destroyed');
  }
}
