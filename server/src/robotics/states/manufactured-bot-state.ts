import {BotState} from "../bot-state";
import {ConfiguredBotState} from "./configured-bot-state";
import {DestroyedBotState} from "./destroyed-bot-state";
import {SingleEntityChild} from "typeorm";
@SingleEntityChild()
export class ManufacturedBotState extends BotState{
  configure(): BotState{
    return new ConfiguredBotState();
  }
  destroy():BotState{
    return new DestroyedBotState();
  }
  toString(){
    return 'manufactured';
  }
}
