export class WebPage{
  private itsUri:string;
  constructor(uri:string){
    this.itsUri=uri;
  }
  getUri(){
    return this.itsUri;
  }
  equals(webPage: WebPage){
    return this.itsUri === webPage.getUri();
  }
}
