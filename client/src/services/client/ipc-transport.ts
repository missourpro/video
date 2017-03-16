// import {ipcRenderer} from "electron"
// import {Transport} from "./transport";
// import {Injectable} from "@angular/core";
// import {Subject} from 'rxjs';
// @Injectable()
// export default class IpcTransport extends Transport{
//   send(command: string, parameters: any) {
//     let subject=new Subject();
//     let callId:number=Math.random()*(new Date().getUTCMilliseconds());
//     //let call:string=command+'/'+callId;
//     console.log('Sending command');
//     ipcRenderer.send(command, callId,  parameters);
//     ipcRenderer.on(command+'/'+callId, (event, result)=>{
//       console.log('Received result'+ 'callId'+callId);
//       subject.next(result);
//     });
//     return subject.asObservable();
//   }
// }
