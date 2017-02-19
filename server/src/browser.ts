import {BrowserListener} from "./browser-listener";
export interface Browser{
  getBrowserListener():BrowserListener;
  setBrowserListener(browserListener: BrowserListener);
  open(html:string);
  close();
}
