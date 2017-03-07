import {ClientListener} from "./client-listener";
import request =require("request-promise");
import CantFetchWebsiteException from "./cant-fetch-website-exception";
export default class Client {
  private clientListener: ClientListener;
  constructor() {

  }
  setClientListener(clientListener: ClientListener) {
    this.clientListener=clientListener;
  }

  fetch(uri:string){
    request(uri)
      .then((html)=>{
        this.clientListener.websiteFetched(html);
      })
      .catch((error)=>{
        throw new CantFetchWebsiteException();
      });
  }
}
