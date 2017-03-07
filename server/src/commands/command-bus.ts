import {Bus} from "../bus/bus";
import * as lodash from "lodash";
import * as path from "path";
import MessageHandler from "../bus/message-handler";
import CommandProvider from "./command-provider";
export default class CommandBus extends Bus{
  constructor(private commandProvider: CommandProvider){
    super();
  }
  protected resolve(message: any): Array<MessageHandler> {
    let commandName=message.constructor.name;
    let handlerName=commandName.replace('Command', 'Handler');
    let handlerClass=this.commandProvider.getCommands()[commandName][handlerName];
    let handlerInstance=new handlerClass();
    return [handlerInstance];
  }

}

