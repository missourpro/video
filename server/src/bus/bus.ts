import {Message} from "./message";
import MessageHandler from "./message-handler";
export abstract class Bus{
  constructor(){

  }
  execute(message:any){
    let handlers:Array<MessageHandler>=this.resolve(message);
    for(let handler of handlers){
      handler.handle(message);
    }

  }
  protected abstract resolve(message:any):Array<MessageHandler>;
}
