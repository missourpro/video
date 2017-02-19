import {Page} from "./page";
export interface ScraperListener{
  scraped(page:Page);
}
