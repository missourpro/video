import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";
import {RoboticsService} from "../../services/robotics-service";

@Component({
  selector: 'page-bot',
  templateUrl: 'bot.html'
})
export class BotPage{
  private uri:string;
  private interval:number=10000;
  private autostart:boolean=false;
  constructor(private viewCtrl:ViewController, private roboticsService:RoboticsService){

  }
  dismiss(data:any){
    this.viewCtrl.dismiss(data);
  }
  manufacture(){
    this.roboticsService.manufacture({uri:this.uri}).subscribe((bot)=>{
        console.log('Bot Manufactured and Configured', bot);
          this.dismiss(bot);
    });
  }

}
