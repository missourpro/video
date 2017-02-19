import {browser} from 'protractor';
export default class PreviewPage{
  getSlideshow(){
    return browser.executeScript(`return frames[0].document.documentElement.outerHTML`);
  }

  getTitle() {
    return 'Preview';
  }
}
