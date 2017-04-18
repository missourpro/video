import {WebPage} from "./web-page";
import {WebsiteChangeList} from "./website-change-list";
import {WebsiteChange} from "./website-change";
export class WebPageList{
  private itsPages:Array<WebPage>=[];
  constructor(pages:Array<WebPage>){
    this.itsPages=pages;
  }
  count() {
    return this.itsPages.length;
  }


  has(other:WebPage): boolean{
    let found:WebPage=this.itsPages.find(page => {
      return page.equals(other);
    });
    return found !== undefined ;
  }
  hasNot(other: WebPage){
    return !this.has(other);
  }

  static empty() {
    return new WebPageList([]);
  }

  add(pages: Array<WebPage>):Array<WebPage> {
    let newPages=this.itsPages.filter(page => {
      return this.hasNot(page);
    });
    if(newPages.length>0){
      this.itsPages.concat(newPages);
    }
    return newPages;
  }

}
