import {BrowserListener} from "./browser-listener";
import {PaintEventListener} from "./paint-event-listener";
export interface Browser{
  setBrowserListener(browserListener: BrowserListener);
  open(html:string);
  close();
  setPaintEventListener(paintEventListener: PaintEventListener): void;
  loadHtml(html: string): void;
}
