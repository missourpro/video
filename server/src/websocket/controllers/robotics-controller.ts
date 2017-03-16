import {Controller} from "../../router/controller";
import {WatcherListener} from "../../watcher/watcher-listener";
import {BotListener} from "../../robotics/bot-listener";
import {Container} from "typedi";
import BotFactory from "../../robotics/bot-factory";
import Bot from "../../robotics/bot";

export default class RoboticsController extends Controller implements BotListener{
  videoCreated() {

  }
  async manufacture(){
    let botFactory:BotFactory=Container.get(BotFactory);
    let bot=await botFactory.manufacture(this.request.get('configuration'));
    bot.setBotListener(this);
    this.response.send(JSON.parse(bot.serialize()));
  }
  async recycle(){
    let botFactory:BotFactory=Container.get(BotFactory);
    let bot:Bot=await botFactory.manufacturedBot(+this.request.get('identity'));
    console.log('bot grabbed');
    await botFactory.recycle(bot);
    console.log('bot recycled');
    this.response.send(true);
  }
  async start(){
    let botFactory:BotFactory=Container.get(BotFactory);
    let bot:Bot=await botFactory.manufacturedBot(+this.request.get('id'));
    bot.start();
    this.response.send(true);
  }
  async stop(id:any){
    let botFactory:BotFactory=Container.get(BotFactory);
    let bot:Bot=await botFactory.manufacturedBot(+this.request.get('id'));
    bot.stop();
    this.response.send(true);
  }
  async all(){
    let botFactory:BotFactory=Container.get(BotFactory);
    let bots:Array<any>=await botFactory.manufacturedBots();
    bots=bots.map(bot=> {
      return JSON.parse(bot.serialize());
    });
    this.response.send(bots);
  }
}
