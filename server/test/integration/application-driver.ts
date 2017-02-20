import * as electron from 'electron';
const {BrowserWindow}=electron;
export default class ApplicationDriver{

  showsWindow() {
    expect(BrowserWindow.getAllWindows().length).toEqual(1);
  }
}
