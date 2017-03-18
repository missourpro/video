import {WebsiteChange} from "./website-change";
export class WebsiteChangeRepository{
  private websiteChanges:Set<WebsiteChange>=new Set<WebsiteChange>();
  add(websiteChange: WebsiteChange){
    this.websiteChanges.add(websiteChange);
  }
  latest(){
    let result:Array<WebsiteChange>;
    return Array.from(this.websiteChanges).reduce((previous, current) =>{
      return previous.when() > previous.when() ?current : previous;
    });
  }
  latestWebsiteChanges(uri: string):Array<WebsiteChange> {
    return this.filterLatestWebsiteChanges(this.sortWebsiteChangesByLatestFirst(this.filterWebsiteChangesOf(uri)));
  }

  private filterWebsiteChangesOf(uri: string):Array<WebsiteChange> {
    return Array.from(this.websiteChanges).filter((change) =>{
      return change.getUri()=== uri;
    });
  }

  private sortWebsiteChangesByLatestFirst(changes: Array<WebsiteChange>) {
    return Array.from(this.websiteChanges).sort((change1, change2) =>{
      if(change1.before(change2)) return -1;
      else if(change1.after(change2)) return 1;
      return 0;
    });
  }

  private filterLatestWebsiteChanges(changes: Array<WebsiteChange>) {
    return Array.from(this.websiteChanges).filter((change) =>{
      return change.sameTimeAs(changes[0]);
    });
  }
}
