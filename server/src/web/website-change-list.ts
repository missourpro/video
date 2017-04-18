import {WebsiteChange} from "./website-change";
import {WebPage} from "./web-page";
import {Website} from "./website";
export class WebsiteChangeList{
  private changes:Array<WebsiteChange>;
  private itsWebsite:Website;
  private itsDate: Date;
  constructor(website:Website, pages:Array<WebPage>){
    this.itsWebsite=website;

    this.changes=pages.map((page:WebPage)=>{
      let change=new WebsiteChange(page);
      change.now();
      return change;
    });
    this.now();
  }
  when(){
    return this.itsDate;
  }
  where(){
    return this.itsWebsite;
  }

  now() {
    this.itsDate=new Date();
  }
  toArray(){
    return this.changes;
  }

}
