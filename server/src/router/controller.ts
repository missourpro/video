import {Request} from "./request";
import {Response} from "./response";
export abstract class Controller{
  constructor(protected request:Request, protected response:Response){

  }
}
