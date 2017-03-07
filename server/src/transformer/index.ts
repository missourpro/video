import Page from "../scraper/page";
import {Paragraphizer} from "./paragraphizer";
import Slideshow from "./slideshow";
export default class Transformer{
  constructor(private paragraphizer:Paragraphizer){

  }
  transform(page:Page):string{
    let slideshow=new Slideshow();
    slideshow.addSlides(this.paragraphizer.paragraphize(page.body));
    return slideshow.render();
  }
}
