export default class WebsiteSnapshot
{
  constructor(private uri: string, private html: string){
  }
  changed(html:string){
    return new WebsiteSnapshot(this.uri, html);
  }
  equals(other: WebsiteSnapshot){
      return this.uri === other.uri && this.html === other.html;
  }

}
