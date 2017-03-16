import {Transport} from "./transport";
import * as io from "socket.io-client";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import Config from "../config";
@Injectable()
export class WebsocketTransport extends Transport{
  private socket;
  constructor(){
    super();
    this.socket=io(Config.SERVER_URI);
  }
  send(route: string, parameters: any) {
    const _id=Math.random()*new Date().getUTCMilliseconds();
    this.socket.emit(route, _id, parameters);
    console.log('Sent request to'+route+' with parameters ', parameters);
    let observable = new Observable(observer => {
        console.log('Subscribed to route '+route+' with id '+_id);
        this.socket.on(route, (id, data) => {
          console.log('received response ('+id+') for'+route+' with data :', data);
          if(_id ===id){
            observer.next(data);
          }
        });
        return () => {
          this.socket.disconnect();
        };

    });

    return observable;
  }
}
