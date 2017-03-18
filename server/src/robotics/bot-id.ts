import * as uuid from "uuid";
export class BotId{
  private value:string;
  constructor(value){
    this.value=value;
  }
  getValue(){
    return this.value;
  }
  equals(botId:BotId){
    return this.value===botId.getValue();
  }
  toString(){
    return this.getValue();
  }

  static unique() {
    return new BotId(uuid.v4());
  }
}
