import { Component} from '@angular/core';
import { Http, Headers} from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import Config from "../../providers/config";
@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html'
})
export class PreviewPage {
  private paragraphs;
  constructor(public nav: NavController, public params: NavParams,private http: Http) {
    this.paragraphs=this.params.get('paragraphs');
  }
  next(){
    let headers=new Headers({'Content-Type': 'application/json'});
    let data={
      html: frames[0].document.documentElement.outerHTML
    };
    this.http.post(Config.SERVER_URI+'/convert',JSON.stringify(data) ,{headers:headers} )
      .subscribe(
        data => {
          $('body').append($('<div id="result"></div>'));
        },
        error => {
          console.log('error'+error);
          $('body').append($('<div id="result"></div>'));
        }
      );
  }

  ionViewDidLoad() {

  }

}
