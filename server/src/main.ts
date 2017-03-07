import MainWindow from './main-window';
import Server from './server';
import {app} from 'electron';
import IpcServer from "./ipc-server";
export default class Main{
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
  private startServer(){
    this.server=new IpcServer();
  }

}
