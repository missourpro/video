import {Route} from "./route";
import ConvertRoute from "./convert-route";
import TransformRoute from "./transform-route";
import WatchRoute from "./watch-route";
export default class RouteProvider{
  getRoutes(): Array<new(...args: any[]) => Route>{
    return [
      ConvertRoute,
      TransformRoute,
      WatchRoute
    ];
  }
}
