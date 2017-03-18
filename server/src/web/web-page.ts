export class WebPage{
  private content:string;
  constructor(content:string){
    this.content=content;
  }
  equals(WebPage: WebPage){
    return this.content === this.content;
  }
}
