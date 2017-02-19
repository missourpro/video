import { element, by} from 'protractor';
export default class HomePage{
  textField:any=element(by.css('#post textarea'));
  previewButton:any=element(by.css('.button-preview'));

  writeText(text:string){
    this.textField.sendKeys(text);
  }

  preview() {
    this.previewButton.click();
  }
}
