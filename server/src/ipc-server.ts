import {ipcMain} from "electron";
import RouteProvider from "./ipc/route-provider";
import {Route} from "./ipc/route";
export default class IpcServer{
  private routeProvider:RouteProvider=new RouteProvider();
  constructor(){
    console.log('Ipc server started');
    this.registerRoutes();
  }

  private registerRoutes() {
    let routes:Array<new(...args: any[]) => Route>=this.routeProvider.getRoutes();
    routes.forEach((route)=>{
      ipcMain.on(route.name.replace('Route', '').toLowerCase(), (event,callId, parameters)=>{
        let routeInstance:Route=new route(event.sender,callId, parameters);
        routeInstance.handle();
      });
    });

  }
}
