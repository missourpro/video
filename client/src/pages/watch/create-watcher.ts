import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";
import Server from "../../providers/server";
import {remote} from "electron";
@Component({
  selector: 'page-create-watcher',
  templateUrl: 'create-watcher.html'
})
export class CreateWatcherPage{
  private website:string;
  private autostart:boolean=false;
  constructor(private viewCtrl:ViewController, private server:Server){

  }
  dismiss(data:any){
    this.viewCtrl.dismiss(data);

  }
  createWatcher(){
    // this.server
    //   .watch(this.website)
    //   .subscribe((result)=>{
    //     console.log(result.uri);
    //   });

    this.dismiss({website: this.website, createdAt:new Date(), state:this.autostart?'running': 'paused'});
  }

}
