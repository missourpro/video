import { Component } from '@angular/core';
import { NavController, ToastController, App} from 'ionic-angular';
import {Paragraphizer} from "../../providers/paragraphizer";
import {PreviewPage} from "../preview/preview";
//import {ipcRenderer, remote} from 'electron';
declare var __dirname;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  post:string;
  constructor(public nav: NavController, private paragraphizer: Paragraphizer,private toast: ToastController,private app: App) {
  }
  preview(){
    let paragraphs : Array<string>;
    //paragraphs = this.paragraphizer.paragraphize(this.post);
    //check text is valid
    // if(paragraphs.length === 0){
    //   this.notify('Please enter some text');
    //
    // }
    //else {
      this.nav.push(PreviewPage, {
        //paragraphs:paragraphs
        text:this.post
      });
      this.app.setTitle('Preview');
    //}
  }

  private notify(message) {

    let toast = this.toast.create({
      position: 'top',
      message: message,
      duration: 3000
    });
    toast.present();
  }

}



