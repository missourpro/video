import {BotListener} from "./bot-listener";
import {BotState} from "./bot-state";
import {StartedBotState} from "./states/started-bot-state";
import {BotId} from "./bot-id";
import {WebsiteListener} from "../web/website-listener";
import {WebsiteChangeList} from "../web/website-change-list";
import {AlarmClock} from "../time/alarm-clock";
import {AlarmClockListener} from "../time/alarm-clock-listener";
import {BotConfiguration} from "./bot-configuration";

export default class Bot implements WebsiteListener, AlarmClockListener{


  private itsId:BotId;
  private itsState:BotState;
  private itsConfiguration: BotConfiguration;
  private itsListener:BotListener;
  private itsQueue:Array<WebsiteChangeList>;
  private static WAKE_UP_INTERVAL: number = 10*1000;
  constructor(private alarm:AlarmClock){
  }
  websiteChanged(changes: WebsiteChangeList) {
    this.itsQueue.push(changes);
  }
  wakeUp() {
    let changes:WebsiteChangeList;
    changes=this.itsQueue.shift()
  }
  getId():BotId{
    return this.itsId;
  }
  setListener(listener:BotListener):void{
    this.itsListener=listener;
  }
  notify(){
    if(this.itsListener){
      this.itsListener.videoCreated();
    }
  }
  start():void{
    this.itsState=this.itsState.start();
    this.itsConfiguration.website.setListener(this);
    this.alarm.every(Bot.WAKE_UP_INTERVAL, this);
  }
  stop():void{
    this.setState(this.itsState.stop());
  }


  isRunning() :boolean{
    //TODO promote equality to level state class: BotState
    return this.itsState instanceof StartedBotState;
  }

  destroy():void {
    this.setState(this.itsState.destroy());
  }
  setState(state:BotState):void{
    this.itsState=state;
  }

  serialize():string{
    return JSON.stringify({
      id: ''+this.itsId,
      uri: this.itsConfiguration.website.getUri(),
      state: ''+this.itsState
    });
  }

  configure(configuration: BotConfiguration) {
    this.setState(this.itsState.configure());
    this.itsConfiguration=configuration;
  }


  setId(botId: BotId) {
    this.itsId=botId;
  }

  getState() {
    return this.itsState;
  }
}
