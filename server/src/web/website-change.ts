export class WebsiteChange{
  private date;
  private uri;
  when(){
    return this.date;
  }
  now(){
    this.date=new Date();
  }

}
