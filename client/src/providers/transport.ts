import {Injectable} from "@angular/core";
@Injectable()
export abstract class Transport{
  abstract send(command:string, parameters:any);
}
