import ControllerServiceProvider from "./controller-service-provider";
import {Controller} from "../router/controller";
export default class RouteServiceProvider{
  constructor(private controllerServiceProvider: ControllerServiceProvider){

  }
  getRoutes(){
    let routes:Array<string>=[];
    let controllers= this.controllerServiceProvider.getControllers();
    console.log('controllers', controllers);
    let actions:Array<string>;
    let route:string;
    controllers.forEach((controller)=>{
      //hack to enumate method names
      let instance=new controller(null, null);
      actions=Object.getOwnPropertyNames(Object.getPrototypeOf(instance));
      actions.splice(actions.indexOf('constructor'), 1);
      actions.forEach((action)=>{
        console.log(action);
        route='/'+controller.name.replace('Controller', '').toLowerCase()+'/'+action;
        routes.push(route);
      });
    });
    return routes;
  }
}
