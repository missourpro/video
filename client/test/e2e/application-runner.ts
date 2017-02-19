import {browser, element, by} from 'protractor';
import HomePage from './home-page';
import PreviewPage from "./preview-page";
import WebpagePage from "./webpage-page";
export default class ApplicationRunner{
  home: HomePage=new HomePage();
  preview: PreviewPage=new PreviewPage();
  webpage: WebpagePage= new WebpagePage();
  constructor(){

  }

  start() {
    browser.get('');
  }

  convertTextToSlideshow(text:string){
    this.home.writeText(text);
    this.home.preview();

  }
  showsPage(title){
    expect(browser.getTitle()).toEqual(title);
  }
  showsPreviewPage(){
    this.showsPage(this.preview.getTitle());
  }
  showsSlideshowContainingString(string){
    this.showsPreviewPage();
    expect(this.preview.getSlideshow()).toContain(string);
  }

  convertWebpageToSlideshow(uri: string) {
    this.navigateTo(this.webpage.getId());
    this.webpage.write(uri);
    this.webpage.preview();



  }
  navigateTo(page){
    element(by.css('.bar-button-menutoggle')).click();
    browser.driver.sleep(2000); //wait for animation
    element(by.css('#route-'+page+' .input-wrapper')).click();
    browser.driver.sleep(2000); //wait for animation

  }

}
