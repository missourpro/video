import Config from "../../src/config";
const request=require('request-promise');
export default class ConvertEndpoint{
  static readonly ROUTE: string='/convert';
  static readonly URI=Config.SERVER_URI+ConvertEndpoint.ROUTE;
    public async post(html:string){
      await request({
        method: 'POST',
        uri:ConvertEndpoint.URI,
        body: {
          'html': html
        },
        json:true
      });

  }
}
