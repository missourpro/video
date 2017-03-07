import {Transport} from "./transport";
import 'rxjs/add/operator/toPromise';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import Config from "./config";
@Injectable()
export default class HttpTransport extends Transport{
  constructor(private http: Http){
    super();
  }
  async send(command: string, parameters: any) {
    const url = Config.SERVER_URI + '/' + command;
    const body = JSON.stringify(parameters);
    const options = new RequestOptions({headers:new Headers({'Content-Type': 'application/json'})});
    return this.http
      .post(url, body , options)
      .toPromise()
      .then((response:Response) => response.json());
      //TODO .catch((error:any) => throw error.json().error || 'Server error');
  }
}
