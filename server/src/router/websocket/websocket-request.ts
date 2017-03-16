import {Request} from "../request";
export default class WebsocketRequest implements Request{
  constructor(private socket,private route, private id, private parameters){

  }
  get(parameter: string) {
    return this.parameters[parameter];
  }

}
