import * as Handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";
import Config from "../../config/index";
export  class Slideshow{
  private slides:Array<string>=[];
  constructor(){

  }
  addSlides(slides:Array<string>){
    this.slides=this.slides.concat(slides);
  }
  //TODO Optimize by caching the template in a member variable
  render(): string {
    let template: HandlebarsTemplateDelegate;
    template=Handlebars.compile(fs.readFileSync(path.join(__dirname, 'fixtures', 'slideshow.hbs'), 'utf8'));
    return template({slides: this.slides});
  }
}
