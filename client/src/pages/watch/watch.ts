import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import Server from "../../providers/server";
import { ModalController } from 'ionic-angular';
import {CreateWatcherPage} from "./create-watcher";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-watch',
  templateUrl: 'watch.html'
})
export class WatchPage {
  private watchers=[];
  constructor(private navCtrl: NavController, private navParams: NavParams, private server: Server, private modalCtrl: ModalController, private storage:Storage) {

  }

  async ionViewDidLoad() {
    await this.storage.ready();
    this.watchers=await this.storage.get('watchers') || [];
    console.log('ionViewDidLoad WatchPage');
  }
  toggleWatcher(index:number){
    this.watchers[index].state=this.watchers[index].state==='running'?'paused': 'running';
  }
  createWatcher(){
    let modal = this.modalCtrl.create(CreateWatcherPage);
    modal.present();
    modal.onDidDismiss(async (watcher)=>{
      this.watchers.push(watcher);
      await this.storage.ready();
      await this.storage.set('watchers', this.watchers);
    });
  }
  async removeWatcher(index:number){
    this.watchers.splice(index, 1);
    await this.storage.ready();
    await this.storage.set('watchers', this.watchers) ;
  }
}
