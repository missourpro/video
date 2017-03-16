import {Response} from "../response";
export default class WebsocketResponse implements Response{
  constructor(private socket, private route, private id){

  }
  send(data: any) {
    this.socket.emit(this.route, this.id, data);
    console.log('sent response for requested route '+this.route +' that has id :' + this.id)
  }
}
