import {WebPage} from "./web-page";
import {WebsiteChange} from "./website-change";
import {WebsiteChangeList} from "./website-change-list";
import {WebPageList} from "./web-page-list";
import {WebsiteListener} from "./website-listener";
export class Website{
  private listener: WebsiteListener;
  private itsPages:WebPageList;
  private itsUri:string;
  constructor(uri:string){
    this.itsUri=uri;
    this.itsPages=WebPageList.empty();
  }
  getUri(){
    return this.itsUri;
  }
  addPages(pages:Array<WebPage>){
    let addedPages: Array<WebPage> = this.itsPages.add(pages);
    this.notify(new WebsiteChangeList(this, addedPages));

  }
  getPages(){
    return this.itsPages;
  }
  setListener(listener:WebsiteListener) {
    this.listener=listener;
  }
  private notify(changes: WebsiteChangeList) {
    this.listener.websiteChanged(changes);
  }
}
