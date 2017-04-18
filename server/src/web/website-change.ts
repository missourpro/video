import {WebPage} from "./web-page";
export class WebsiteChange{
  private date:Date;
  private webPage:WebPage;
  constructor(page:WebPage){
    this.webPage=page;
  }
  when(){
    return this.date;
  }
  now(){
    this.date=new Date();
  }

  getWebPage() {
    return this.webPage;
  }
  setWebPage(webPage:WebPage) {
    this.webPage=webPage;
  }
  before(change:WebsiteChange){
    return this.when()<change.when();
  }
  after(change:WebsiteChange){
    return this.when()>change.when();
  }
  sameTimeAs(change:WebsiteChange){
    return this.when().getTime()=== change.when().getTime();
  }

  equals(change: WebsiteChange) {
    return this.webPage.equals(change.getWebPage());
  }
}
