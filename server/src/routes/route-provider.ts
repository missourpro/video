import {Route} from "./route";
import ConvertRoute from "./convert-route";
import ScrapeRoute from "./scrape-route";
export default class RouteProvider{
  getRoutes():Array<new(...args: any[]) => Route>{
    return [ConvertRoute, ScrapeRoute];
  }
}
