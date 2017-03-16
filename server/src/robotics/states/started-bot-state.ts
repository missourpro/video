import {BotState} from "../bot-state";
import {StoppedBotState} from "./stopped-bot-state";
import {DestroyedBotState} from "./destroyed-bot-state";
import {SingleEntityChild} from "typeorm";
@SingleEntityChild()
export class StartedBotState extends BotState{
  stop():BotState{
    return new StoppedBotState();
  }
  destroy():BotState{
    return new DestroyedBotState();
  }
  toString(){
    return 'started';
  }
}
