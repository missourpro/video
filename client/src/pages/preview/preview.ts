import { Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import Server from "../../providers/server";
@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html'
})
export class PreviewPage {
  private paragraphs;
  private html:string;
  constructor(public nav: NavController, public params: NavParams,private server:Server, private toast: ToastController) {
    //this.paragraphs=this.params.get('paragraphs');
  }

  async transform(text:string){
    let result=await this.server.transform(text);
    this.html=result.html;
  }
  async next(){
    let result=await this.server.convert(frames[0].document.documentElement.outerHTML);
    this.toast.create({message: result.path, duration: 3000}).present();
  }
  ionViewDidLoad() {
    this.transform(this.params.get('text'));
  }

}
