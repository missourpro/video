import {Website} from "./website";
import {Webmaster} from "./webmaster";
import {AlarmClock} from "../time/alarm-clock";
import {Service} from "typedi";
@Service()
export class WebsiteRepository{
  private websites: Array<Website>;
  constructor() {
    this.websites = [];
  }
  getWebsiteByUri(uri: string): Website {
    let website: Website;
    let webmaster: Webmaster;
    website = this.websites.find((website: Website) => {
      return website.getUri() === uri;
    });
    if (website === undefined) {
      webmaster=new Webmaster(new AlarmClock);
      website=webmaster.createWebsite(uri);
    }
    this.websites.push(website);
    return website;
  }
}
