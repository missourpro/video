import {Controller} from "../../router/controller";
import {BotListener} from "../../robotics/bot-listener";
import {Container} from "typedi";
import BotFactory from "../../robotics/bot-factory";
import Bot from "../../robotics/bot";
import {BotId} from "../../robotics/bot-id";
import {BotConfiguration} from "../../robotics/bot-configuration";
import {WebsiteRepository} from "../../web/website-repository";

export default class RoboticsController extends Controller implements BotListener{
  videoCreated() {
    this.response.send({event:'video-created', path:''})
  }
  manufacture(){
    this.response.send(true);
    let botFactory:BotFactory=Container.get(BotFactory);
    let websites:WebsiteRepository=Container.get(WebsiteRepository);
    let configuration:BotConfiguration=new BotConfiguration(websites.getWebsiteByUri(this.request.get('configuration').uri));
    this.response.send(true);
    let bot=botFactory.manufacture(configuration);
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
    bot.setListener(this);
  }
}
