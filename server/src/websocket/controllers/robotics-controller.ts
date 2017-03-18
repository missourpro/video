import {Controller} from "../../router/controller";
import {WatcherListener} from "../../watcher/watcher-listener";
import {BotListener} from "../../robotics/bot-listener";
import {Container} from "typedi";
import BotFactory from "../../robotics/bot-factory";
import Bot from "../../robotics/bot";
import {BotId} from "../../robotics/bot-id";
import {BotConfiguration} from "../../robotics/bot-configuration";

export default class RoboticsController extends Controller implements BotListener{
  videoCreated() {
    this.response.send({update:'video-created', path:''})
  }
  manufacture(){
    let botFactory:BotFactory=Container.get(BotFactory);
    let configuration=new BotConfiguration();
    configuration.uri=this.request.get('configuration').uri;
    let bot=botFactory.manufacture(configuration);
    bot.setBotListener(this);
    this.response.send(JSON.parse(bot.serialize()));
  }
  recycle(){
    let botFactory:BotFactory=Container.get(BotFactory);
    botFactory.recycle(new BotId(this.request.get('id')));
    console.log('bot recycled');
    this.response.send(true);
  }
  start(){
    let botFactory:BotFactory=Container.get(BotFactory);
    let bot:Bot=botFactory.manufacturedBot(new BotId(this.request.get('id')));
    bot.start();
    this.response.send(true);
  }
  stop(id:any){
    let botFactory:BotFactory=Container.get(BotFactory);
    let bot:Bot=botFactory.manufacturedBot(new BotId(this.request.get('id')));
    bot.stop();
    this.response.send(true);
  }
  all(){
    let botFactory:BotFactory=Container.get(BotFactory);
    let bots:Array<any> = botFactory.manufacturedBots();
    bots=bots.map(bot=> {
      return JSON.parse(bot.serialize());
    });
    this.response.send(bots);
  }
  listen(){
    let botFactory:BotFactory=Container.get(BotFactory);
    let bot:Bot=botFactory.manufacturedBot(new BotId(this.request.get('id')));
    bot.setBotListener(this);
  }
}
