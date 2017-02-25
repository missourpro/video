import Config from "../../src/config";
const request=require('request-promise');

export default class ScrapeEndpoint{
  private static readonly  ROUTE: string='/scrape';
  public static readonly URI:string=Config.SERVER_URI + ScrapeEndpoint.ROUTE;
  async post(uri:string){
    return await request({
      method: 'POST',
      uri: ScrapeEndpoint.URI,
      body: {
        'uri': uri
      },
      json:true
    });

  }
}
