import WatchHandler from "./watch-handler";
import {CommandHandler} from "./command-handler";
export default class CommandProvider{
  protected commands={
    WatchCommand : {
      WatchHandler
    }

  };
  getCommands(){
    return this.commands;
  }
}
