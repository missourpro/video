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

  it('ConvertsDynamicHtmlToVideo', async ()=>{
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

     //await fakeWebsite.hasReceivedRequestFor('/webpage')
      //await app.hasReceivedHtmlResponse(WEBPAGE_HTML);
      //await app.hasExtractedTextFromWebpage(TEXT);


  });
  fit('ScrapesHespress', async ()=> {

    let uri='http://www.hespress.com';
    let endpoint='/societe/339704.html';
    let result=await app.scrapeWebpage(uri+endpoint);
    expect(result.page.title.length>0).toBeTruthy();
    expect(result.page.body.length>0).toBeTruthy();
    expect(result.page.image.length>0).toBeTruthy();
    expect(result.page.image.indexOf('http')===0).toBeTruthy();
    expect(result.page.comments).toBeArray();
    expect(result.page.comments[0]['body'].length>0).toBeTruthy();
    expect(result.page.comments[0]['date'].length>0).toBeTruthy();
    expect(result.page.comments[0]['author'].length>0).toBeTruthy();

  });
});
