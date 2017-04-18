import {AlarmClockListener} from "../time/alarm-clock-listener";
import {Website} from "./website";
import {AlarmClock} from "../time/alarm-clock";
import {WebPage} from "./web-page";
import request =require("request-promise");
import * as cheerio from 'cheerio';
export class Webmaster implements AlarmClockListener {
  private itsWebsite: Website;
  private static WAKE_UP_INTERVAL: number;

  constructor(private alarm: AlarmClock) {
  }

  createWebsite(uri: string) {
    this.maintain(new Website(uri));
    return this.itsWebsite;
  }

  async wakeUp(): Promise<void> {
    let html: string;
    html = await this.fetch(this.itsWebsite.getUri());
    let pages: Array<WebPage> = this.extract(html);
    this.itsWebsite.addPages(pages);
  }
  private fetch(uri: string): Promise<string> {
    return request(uri);
  }

  private extract(html: string): Array<WebPage> {
    let root = cheerio(html);
    let hespressSelector = '#rotating_headlines .headline_article h1>a';
    let webPages = [];
    root.find(hespressSelector).each((index: number, element: CheerioElement) => {
      webPages.push(new WebPage(cheerio(element).attr('href')));
    });
    return webPages;
  }

  private maintains(website: Website) {
    return this.itsWebsite === website;
  }
  private maintain(website: Website) {
    this.itsWebsite = website;
    this.alarm.every(Webmaster.WAKE_UP_INTERVAL, this);
  }
}
