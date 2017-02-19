import ApplicationRunner from './application-runner';
//import FakeServer from './fake-server';
describe('App', () => {
  let app = new ApplicationRunner();
  //let fakeServer=new FakeServer();
  beforeEach(() => {
    app.start();
  });
  it('convertsTextToDynamicHtmlSlideshow', () => {
    const string = 'hello world';
    app.convertTextToSlideshow(string);
    app.showsPreviewPage();
    app.showsSlideshowContainingString(string);
  });
  //TODO Test to be implemented by server so delete this
  // it('convertsRemoteWebpageToDynamicHtmlSlideshow', async ()=> {
  //   let string = 'hello world';
  //   await fakeServer.start();
  //   let uri=await fakeServer.getUri();
  //   app.convertWebpageToSlideshow(uri+'/webpage');
  //   app.showsPreviewPage();
  //   app.showsSlideshowContainingString(string);
  // });
});
