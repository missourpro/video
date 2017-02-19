import * as express from 'express';
import Request = express.Request;
import Response = express.Response;
const statuses=require('statuses');
export abstract class Route{

  /**
   * Http method constants
   * @type {string}
   */
  public static GET='get';
  public static POST='post';

  private request:Request;
  private response: Response

  /**
   * Define a route
   * Example: /index
   */
  route:string;
  /**Http method
   *
   */
  method:string=Route.GET;
  /**
   * The route handler
   */
  handler: Function;
  private static HTTP_STATUS_OK: number=statuses('ok');
  constructor(){
  }
  send(response:string){
    this.response.send(response);
  }
  get(param:string){
    return this.request.body[param] || this.request.query[param];
  }

  /**
   * send http success response
   */
  ok(){
    this.response.send();
  }
  getRoute():string{
    return this.route;
  }
  getMethod():string{
    return this.method;
  }
  getHandler():Function{
    return this.handler.bind(this);
  }


  setRequest(req: Request) {
    this.request=req;
  }

  setResponse(res: Response) {
    this.response=res;
  }

  execute() {
    return this.getHandler()();
  }
  json(object:Object){
    this.response.send(Route.HTTP_STATUS_OK, JSON.stringify(object))
  }
}
