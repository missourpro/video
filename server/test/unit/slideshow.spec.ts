
import Slideshow from "../../src/transformer/slideshow";
fdescribe('Watcher', ()=> {
  beforeEach(async() => {
  });
  afterEach(async() => {
  });
  it('addsSlides',  ()=>{
    let slideshow:Slideshow=new Slideshow();
    let slides=['slide1', 'slide2'];
    slideshow.addSlides(slides);
    let html=slideshow.render();
    expect(html).toContain('slide1');
    expect(html).toContain('slide2');
  });
});
