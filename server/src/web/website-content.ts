export class WebsiteContent{
  private content:string;
  constructor(content:string){
    this.content=content;
  }
  equals(websiteContent: WebsiteContent){
    return this.content === this.content;
  }
}
