import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Router {

  constructor(public http: Http) {
    console.log('Hello Router Provider');
  }
  navigate(page:any){

  }

}
