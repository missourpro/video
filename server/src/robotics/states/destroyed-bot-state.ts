import {BotState} from "../bot-state";
import {SingleEntityChild} from "typeorm";
@SingleEntityChild()
export class DestroyedBotState extends BotState{
  toString(){
    return 'destroyed';
  }
}
