import {Route} from "./route";

import {ScraperListener} from "../scraper/scraper-listener";
import Scraper from "../scraper/index";
export default class ScrapeRoute extends Route implements ScraperListener{
  route='/scrape';
  method=Route.POST;
  handler=this.scrape;
  scrape(){
    console.log('Scraping');

    let scraper: Scraper=new Scraper(this);

    //TODO ensure html is not empty
    scraper.scrape(this.get('uri'));
  }
  scraped(page): void {
    this.json({page: page});
  }
}
