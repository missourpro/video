import ApplicationRunner from './application-runner';
import * as fs from "fs";
import * as path from "path";
import Config from "../../src/config/index";
import any = jasmine.any;
const request=require('request-promise');
const ONE_MINUTE = 60 * 1000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = ONE_MINUTE;
describe('App', () => {
  const TEXT:string = 'hello world';
  const SLIDESHOW_HTML:string =fs.readFileSync(path.resolve(__dirname, 'fixtures/slideshow.html'), 'utf8').replace(new RegExp('{{PUBLIC_PATH}}', 'g'), Config.PUBLIC_PATH);
  const app = new ApplicationRunner();
  beforeEach(async ()=> {
    await app.start();
  });

  afterEach(async ()=> {
    await app.stop();
  });

  fit('ConvertsDynamicHtmlToVideo', async ()=>{
      await app.convertDynamicHtmlToVideo(SLIDESHOW_HTML);
      await app.hasCreatedVideoContainingText(TEXT);
  });
  it('ScrapesWebpage', async ()=> {
      //await fakeWebsite.start();
      //let uri=await fakeWebsite.getUri();
      let uri='http://www.hespress.com';
      let endpoint='/societe/339704.html';
      // let fesnews=nock(uri)
      //   .get(endpoint)
      //   .reply(200, 'article');
      //await request(uri+endpoint);
      await app.scrapeWebpage(uri+endpoint);//uri+endpoint);


      //fesnews.done();
      //await fakeWebsite.hasReceivedRequestFor('/webpage')
      //await app.hasReceivedHtmlResponse(WEBPAGE_HTML);
      //await app.hasExtractedTextFromWebpage(TEXT);


  });
});
