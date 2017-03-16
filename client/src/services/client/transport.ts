import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
@Injectable()
export abstract class Transport{
  abstract send(command:string, parameters:any):Observable<any>;
}
