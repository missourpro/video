import { Component } from '@angular/core';
import {NavController, ToastController, App} from 'ionic-angular';
import {Paragraphizer} from "../../services/paragraphizer";
import {PreviewPage} from "../preview/preview";
import {Http, Response, Headers} from "@angular/http";
import  Config from "../../services/config";


@Component({
  selector: 'page-webpage',
  templateUrl: 'webpage.html'
})
export class WebpagePage {
  private uri: string;

  constructor(public nav: NavController,
              private paragraphizer: Paragraphizer,
              private toast: ToastController,
              private app: App,
              private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WebpagePage');
  }

  preview(){
    let headers=new Headers({'Content-Type': 'application/json'});
    let data={
      uri: this.uri
    };
    this.http.post(Config.SERVER_URI+'/scrape',JSON.stringify(data) ,{headers:headers} )
      .subscribe(
      (response: Response)=>{
        this.nav.push(PreviewPage, {
          paragraphs:this.paragraphizer.paragraphize(response.json().page.body)
        });
        this.app.setTitle('Preview');
    },
      (error)=>{
        console.log(error.message);
      });
  }

}
