import {WebsiteChange} from "./website-change";
import {WebClient} from "./web-client";
import {WebsiteChangeRepository} from "./website-change-repository";
import {WebsiteContent} from "./website-content";
export class WebsiteChangeDetector{
  private currentWebsiteChange:WebsiteChange;
  private webClient:WebClient;
  private websiteChangeRepository:WebsiteChangeRepository;
  constructor(private uri){

  }
  detectChange(): WebsiteChange {
    let websiteContent:WebsiteContent= new WebsiteContent(this.webClient.fetch(this.uri));

    return this.currentWebsiteChange;
  }
}
