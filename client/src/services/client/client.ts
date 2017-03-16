import {Transport} from "./transport";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
@Injectable()
export class Client{
  constructor(private transport:Transport){
  }
  send(route, parameters):Observable<any>{
    return this.transport.send(route, parameters);
  }
  // watch(uri:string){
  //   return this.transport.send('watch',{uri: uri});
  // }
  // convert(html:string):Promise<{path: string}>{
  //   return this.transport.send('convert', {html:html});
  // }
  // scrape(uri:string){
  //   return this.transport.send('scrape', {uri:uri});
  // }
  //
  // transform(text: string) {
  //   return this.transport.send('transform', {text:text});
  // }
}
