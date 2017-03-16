import * as http from "http";
import * as io from "socket.io";
import Config from "./config/index";
import Router from "./router/router";
import Instantiator from "../../common/support/instantiator";
import ControllerServiceProvider from "./providers/controller-service-provider";
import WebsocketRequest from "./router/websocket/websocket-request";
import {Controller} from "./router/controller";
import WebsocketResponse from "./router/websocket/websocket-response";
import RouteServiceProvider from "./providers/route-service-provider";
export default class WebsocketServer{
  private io;
  private http;
  private router;
  private controllerServiceProvider:ControllerServiceProvider;
  private routeServiceProvider:RouteServiceProvider;
  constructor(){
    this.http=http.createServer();
    this.io=io(this.http);
    this.controllerServiceProvider=new ControllerServiceProvider();
    this.routeServiceProvider=new RouteServiceProvider(this.controllerServiceProvider);
    this.router=new Router(this.controllerServiceProvider,new Instantiator());
    this.io.on('connection', (socket)=>{
      console.log('client connected');
      socket.on('disconnect', ()=>{
        console.log('client disconnected');
      });
      let routes:Array<string>= this.routeServiceProvider.getRoutes();
      routes.forEach((route)=>{
        console.log(route);
        socket.on(route, (id, parameters)=>{
          console.log('received request for route '+route+' with parameters :', parameters);
          this.router.dispatch(route, new WebsocketRequest(socket, route, id, parameters), new WebsocketResponse(socket, route, id))
        });
      });
    });
    this.http.listen(Config.SERVER_PORT, () => {
      console.log('Websocket server listening on port'+Config.SERVER_PORT);
    });
  }

}
