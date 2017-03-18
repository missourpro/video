import {WebsiteChange} from "./website-change";
import {WebClient} from "./web-client";
import {WebsiteChangeRepository} from "./website-change-repository";
import {WebPage} from "./web-page";
import {WebsiteChangeExtractor} from "./website-change-extractor";
export class WebsiteChangeDetector{
  private webClient:WebClient;
  private websiteChangeRepository:WebsiteChangeRepository;
  private websiteChangeExtractor:WebsiteChangeExtractor;
  constructor(private uri){

  }
  detectChanges(): Array<WebsiteChange> {
    let page:WebPage= new WebPage(this.webClient.fetch(this.uri));
    let currentChanges:Array<WebsiteChange> =this.websiteChangeExtractor.extract(page);
    let previousChanges:Array<WebsiteChange> =this.websiteChangeRepository.latestWebsiteChanges(this.uri);
    let changes:Array<WebsiteChange> =currentChanges.filter(currentChange=>{
      return previousChanges.find(previousChange=>{
        return previousChange.equals(currentChange);
      });
    });
    return changes;
  }

  setUri(uri:string) {
    this.uri=uri;
  }
}
