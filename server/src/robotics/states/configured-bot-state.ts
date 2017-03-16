import {BotState} from "../bot-state";
import {StartedBotState} from "./started-bot-state";
import {DestroyedBotState} from "./destroyed-bot-state";
import {SingleEntityChild} from "typeorm";
@SingleEntityChild()
export class ConfiguredBotState extends BotState{
  start():BotState{
    return new StartedBotState();
  }
  destroy():BotState{
    return new DestroyedBotState();
  }
  toString(){
    return 'configured';
  }
}
