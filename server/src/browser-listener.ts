export interface BrowserListener{
  browserPainted(frame:Buffer);
}
export class NullBrowserListener implements BrowserListener{
  browserPainted(frame: Buffer) {
  }

}
