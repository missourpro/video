import WebsiteSnapshot from "./website-snapshot";
export default class History {
  private memory:Array<WebsiteSnapshot>=[];
  constructor() {

  }
  save(websiteSnapshot: WebsiteSnapshot){
    this.memory.push(websiteSnapshot);
  }
  latest(): WebsiteSnapshot{
    return this.memory[this.memory.length-1];
  }
  empty(): boolean {
    return this.memory.length===0;
  }
}

