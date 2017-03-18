export class WebsiteChange{
  private date:Date;
  private uri;
  when(){
    return this.date;
  }
  now(){
    this.date=new Date();
  }

  getUri() {
    return this.uri;
  }
  before(change:WebsiteChange){
    return this.when()<change.when();
  }
  after(change:WebsiteChange){
    return this.when()>change.when();
  }
  sameTimeAs(change:WebsiteChange){
    return this.when().getTime()=== change.when().getTime();
  }

  equals(change: WebsiteChange) {
    return this.uri === change.getUri();
  }
}
