import Page from "./page";
import Parser from "./parser";
export default class Extractor{
  constructor(private parser:Parser){

  }
  extract(html:string):Page{
    {
      let element=this.parser.parse(html);
      element.find();
    };
  }
}
