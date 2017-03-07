import {Transport} from "./transport";
import {Injectable} from "@angular/core";
@Injectable()
export default class Server{
  constructor(private transport:Transport){
  }
  watch(uri:string){
    return this.transport.send('watch',{uri: uri});
  }
  convert(html:string):Promise<{path: string}>{
    return this.transport.send('convert', {html:html});
  }
  scrape(uri:string){
    return this.transport.send('scrape', {uri:uri});
  }

  transform(text: string) {
    return this.transport.send('transform', {text:text});
  }
}
