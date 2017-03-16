import { Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html'
})
export class PreviewPage {
  //private paragraphs;
  //private html:string;
  constructor(public nav: NavController, public params: NavParams,private toast: ToastController) {
    //this.paragraphs=this.params.get('paragraphs');
  }

  async transform(text:string){

  }
  async next(){

  }
  ionViewDidLoad() {
    this.transform(this.params.get('text'));
  }

}
