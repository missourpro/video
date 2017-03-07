import {Bus} from "../bus/bus";
import * as lodash from "lodash";
import * as fs from "fs";
import * as path from "path";
import MessageHandler from "../bus/message-handler";
export default class EventBus extends Bus{
  resolve(message: any): MessageHandler[] {
    let handlers=fs.readdirSync(path.join(__dirname))
      .filter((file)=>{
        return file.indexOf('-when-') !== -1;
      })
      .map((file)=>{
        let handlerClass=require(file);
        return new handlerClass();
      });
    return handlers;
  }
  dispatch(event:any){
    this.execute(event);
  }


}
