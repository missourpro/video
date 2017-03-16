import {Component, ChangeDetectorRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import {RoboticsService} from "../../services/robotics-service";
import {BotPage} from "./bot";

@Component({
  selector: 'page-bot-factory',
  templateUrl: 'bot-factory.html'
})
export class BotFactoryPage {
  bots:Array<any>=[];
  constructor(private navCtrl: NavController, private navParams: NavParams,  private modalCtrl: ModalController, private roboticsService:RoboticsService, private changeDetectorRef:ChangeDetectorRef) {

  }
  ionViewDidLoad() {
    this.roboticsService.all().subscribe((bots)=>{
      this.bots=bots;
      this.changeDetectorRef.detectChanges();
    });
    console.log('ionViewDidLoad WatchPage');
  }
  toggleBotState(index:number){
    this.bots[index].state=this.bots[index].state==='started'?'started': 'stopped';
  }
  manufacture(){
    let modal = this.modalCtrl.create(BotPage);
    modal.present();
    modal.onDidDismiss(async (bot)=>{
      this.bots.push(bot);
    });
  }
  start(index){
    this.roboticsService.start(this.bots[index].id).subscribe((started)=>{
      if(started) this.bots[index].state='started';
      this.changeDetectorRef.detectChanges();
    });
  }
  stop(index){
    this.roboticsService.stop(this.bots[index].id).subscribe((started)=>{
      if(started) this.bots[index].state='stopped';
      this.changeDetectorRef.detectChanges();
    });
  }
  recycle(index:number){
    this.roboticsService.recycle(this.bots[index].id).subscribe((recycled)=>{
      if(recycled) this.bots.splice(index, 1);
      this.changeDetectorRef.detectChanges();

    });
  }
  isStarted(index):boolean{
    return this.bots[index].state ==='started';
  }
  isStopped(index){
    return this.bots[index].state !=='started';
  }
  isFailed(index){
    return false;
  }
}
