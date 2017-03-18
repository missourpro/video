import "reflect-metadata";
import MainWindow from './main-window';
import Server from './http-server';
import {app} from 'electron';
import IpcServer from "./ipc-server";
import WebsocketServer from "./websocket-server";
import "reflect-metadata";
import {createConnection, Connection} from "typeorm";
import Config from "./config/index";
import Watcher from "./watcher/watcher";
import Client from "./watcher/client";
import History from "./watcher/history";
import {WatcherListener} from "./watcher/watcher-listener";
import ConnectionManager from "./persistence/connection-manager";
import {Container} from "typedi";
import BotFactory from "./robotics/bot-factory";
export default class Main implements WatcherListener{
  websiteChanged(uri: string) {

  }

  private ui:MainWindow;
  private server;
  private static  app: Electron.App=app;
  constructor(){


      this.startUserInterface();
      this.startServer();

  }
  static main(...args: Array<string>){
    let main: Main;
    main=new Main();
  }
  private startUserInterface(){
    this.ui=new MainWindow();

  }
  private async startServer(){
      this.server=new WebsocketServer();
  }

}
