import RouteNotFoundException from "./route-not-found-exception";
import {Controller} from "./controller";
import ControllerServiceProvider from "../providers/controller-service-provider";
import Instantiator from "../../../common/support/instantiator";
import {Request} from "./request";
import {Response} from "./response";
export default class Router{
  private controllers:Map<typeof Controller, Controller> =new Map();
  constructor(private service: ControllerServiceProvider, private instantiator:Instantiator) {

  }
  dispatch(route, request:Request, response:Response){
    //extract controller and action from route "/controller/action"
    let controller=route.split('/')[1]+'controller';
    let action=route.split('/')[2];

    let instance:Controller;
    let controllers=this.service.getControllers()
      .filter((type:typeof Controller)=>{
        return controller.toLowerCase() === type.name.toLowerCase();
      });
    if(controllers.length !== 1){
      throw new RouteNotFoundException(route);
    }
    let type=controllers[0];
    instance=this.instantiator.getInstance<Controller>(type, request, response);
    instance[action].call(instance);
  }
}
