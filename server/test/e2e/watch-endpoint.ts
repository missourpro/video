import Config from "../../src/config";
const request=require('request-promise');

export default class WatchEndpoint{
  private static readonly  ROUTE: string='/watch';
  public static readonly URI:string=Config.SERVER_URI + WatchEndpoint.ROUTE;
  async post(uri:string){
    return await request({
      method: 'POST',
      uri: WatchEndpoint.URI,
      body: {
        'uri': uri
      },
      json:true
    });

  }
}
