import {Route} from "./route";
import Transformer from "../transformer/index";
import {Paragraphizer} from "../transformer/paragraphizer";
import Page from "../scraper/page";
export default class TransformRoute extends Route{
  handle() {
    let transformer:Transformer=new Transformer(new Paragraphizer());
    let page=new Page();
    page.body=this.get('text');
    this.send({html: transformer.transform(page)})
  }


}
