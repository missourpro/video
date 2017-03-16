import {Transport} from "./transport";
import 'rxjs/add/operator/toPromise';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
@Injectable()
export default class HttpTransport extends Transport{
  send(command: string, parameters: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  // constructor(private http: Http){
  //   super();
  // }
  // async send(command: string, parameters: any) {
  //   const url = Config.SERVER_URI + '/' + command;
  //   const body = JSON.stringify(parameters);
  //   const options = new RequestOptions({headers:new Headers({'Content-Type': 'application/json'})});
  //   return this.http
  //     .post(url, body , options)
  //     .toPromise()
  //     .then((response:Response) => response.json());
  //     //TODO .catch((error:any) => throw error.json().error || 'Server error');
  // }
}
