import {Client} from "./client/client";
import {Injectable} from "@angular/core";
@Injectable()
export class RoboticsService{
  constructor(private client:Client){

  }
  manufacture(configuration:{uri:string}){
    return this.client.send('/robotics/manufacture', {configuration: configuration});
  }
  recycle(id:any){
    return this.client.send('/robotics/recycle', {identity:id});
  }
  start(id:any){
    return this.client.send('/robotics/start', {id:id});
  }
  stop(id:any){
    return this.client.send('/robotics/stop', {id:id});
  }
  all(){
    return this.client.send('/robotics/all', {});
  }
}