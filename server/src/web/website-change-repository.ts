import {WebsiteChange} from "./website-change";
export class WebsiteChangeRepository{
  private websiteChanges:Set<WebsiteChange>=new Set<WebsiteChange>();
  add(websiteChange: WebsiteChange){
    this.websiteChanges.add(websiteChange);
  }
  latest(){
    return Array.from(this.websiteChanges).reduce((previous:WebsiteChange, current:WebsiteChange) =>{
      return current.when() > previous.when() ?current:previous;
    });
  }
}
