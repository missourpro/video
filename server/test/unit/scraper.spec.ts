// describe('Scraper', ()=> {
//   const UNUSED_URI=null;
//   it('scrapesWebpageByUri', ()=>{
//     let browser: Browser=jasmine.createSpyObj<Browser>('browser', ['open']);
//     let inspector: Inspector=jasmine.createSpyObj<Inspector>('inspector', ['inspect', 'byCss']);
//     let parser: Parser=jasmine.createSpyObj<Parser>('parser', ['parse']);
//     let scraper:Scraper=new Scraper(browser, parser);
//
//     scraper.scrape(UNUSED_URI);
//     scraper.browserLoaded();
//
//     expect(inspector.inspect).toHaveBeenCalledWith(browser);
//     expect(inspector.byCss).toHaveBeenCalled();
//     expect(parser.parse).toHaveBeenCalledWith(UNUSED_CSS_SELECTOR);
//   });
// });
