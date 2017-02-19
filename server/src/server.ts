import * as bodyParser from 'body-parser';
import * as express from 'express';
import Config from './config';
import  * as cors from 'cors';
import * as http from "http";
import RequestHandler = express.RequestHandler;
import Request = express.Request;
import Response = express.Response;
import NextFunction = express.NextFunction;
import {Route} from "./routes/route";
import RouteProvider from "./routes/route-provider";
export default class Server {

  private server:http.Server;
  private app:express.Application;
  private router: express.Router;
  static readonly PORT: number=Config.SERVER_PORT;
  static readonly PUBLIC_PATH: string=Config.PUBLIC_PATH;

  constructor(){
    this.app=express();
    this.router=express.Router();
    this.usePlugins();
    this.registerRoutes();
    /*this.app.post('/scrape',(req, res)=>{
      res.send()
    })*/
    this.startListening();
  }

  private startListening() {
    this.server=this.app.listen(Server.PORT, function () {
      console.log('Server listening on port ' + Server.PORT );
    });
  }


  private  registerRoutes() {

    let routeProvider:RouteProvider=new RouteProvider();
    let routes:Array<new(...args: any[]) => Route>=routeProvider.getRoutes();
    routes.forEach((routeClass)=>{
      let route:Route=new routeClass();
      this.app[route.getMethod()](route.getRoute(),  (req:Request, res: Response) => {
        route.setRequest(req);
        route.setResponse(res);
        route.execute();
      });
    });

  }


  private usePlugins() {
    this.app.use(this.router);
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(express.static(Server.PUBLIC_PATH));
  }

}
