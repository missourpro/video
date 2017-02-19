import {element, by} from "protractor";
export default class WebpagePage{
  private uriField=element(by.css('.field-uri input'));
  private previewButton= element(by.css('.button-preview'));
  private id='webpage';
  getId(){
    return this.id;
  }
  write(uri: string) {
    this.uriField.sendKeys(uri);
  }
  preview(){
    this.previewButton.click();
  }

}
