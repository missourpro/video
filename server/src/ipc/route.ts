export abstract class Route{
  constructor(private sender: any,private callId:number,  private parameters:any){

  }
  abstract handle();
  protected get(parameter:string){
    return this.parameters[parameter];
  }
  protected send(result: any) {
    this.sender.send(this.constructor.name.replace('Route', '').toLowerCase()+'/'+this.callId, result);
  }
}
