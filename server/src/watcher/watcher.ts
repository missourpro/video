import Client from "./client";
import History from "./history";
import {WatcherListener} from "./watcher-listener";
import {ClientListener} from "./client-listener";
import WebsiteSnapshot from "./website-snapshot";
import Timer = NodeJS.Timer;
import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {Service} from "typedi";
export default class Watcher implements ClientListener{
  private static DEFAULT_WATCH_INTERVAL = 10000;
  private static STOPPED_TIMER: Timer = null;

  private uri:string;
  private interval:number=Watcher.DEFAULT_WATCH_INTERVAL;

  private timer: Timer;
  private previousFetchDidFinish:boolean;
  private watcherListener: WatcherListener
  constructor(  private client: Client, private history: History){
    this.client.setClientListener(this);
  }
  watch(uri: string) {
    this.uri=uri;
    this.previousFetchDidFinish=true;
    this.fetchInitially(uri);
    this.fetchPeriodically(uri);

  }
  setWatcherListener(watcherListener:WatcherListener){
    this.watcherListener=watcherListener;
  }
  private fetchInitially(uri: string) {
    this.fetch(uri);

  }

  private fetch(uri: string) {
    if(this.previousFetchDidFinish){
      this.client.fetch(uri);
      this.previousFetchDidFinish=false;
    }

  }

  private fetchPeriodically(uri: string) {
    this.timer = setInterval(() => {
      this.fetch(uri);
    }, this.interval);
  }

  websiteFetched(html: string) {
    this.previousFetchDidFinish=true;
    if(this.isStopped()){
      return;
    }
    //first time
    if(this.history.empty()){
      this.history.save(new WebsiteSnapshot(this.uri, html));
      return;
    }
    //next time
    if(!this.history.latest().equals(new WebsiteSnapshot(this.uri, html))){
      this.history.save(new WebsiteSnapshot(this.uri, html));
      this.watcherListener.websiteChanged(this.uri);
      return;
    }
  }

  private isStopped() {
    return this.timer === Watcher.STOPPED_TIMER;
  }

  stop() {
    clearInterval(this.timer);
    this.timer=Watcher.STOPPED_TIMER;
  }
}
