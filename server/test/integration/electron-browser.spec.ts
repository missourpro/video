import ElectronBrowser from "../../src/electron-browser";
import {Browser} from "../../src/browser";
import ApplicationDriver from "./application-driver";
xdescribe('ElectronBrowser', ()=> {
  const app=new ApplicationDriver();
  beforeEach(async() => {

  });
  afterEach(async() => {

  });
  xit('opensWindow', async ()=>{
    let browser:Browser=new ElectronBrowser();
    browser.open('');
    app.showsWindow();
  });
});
