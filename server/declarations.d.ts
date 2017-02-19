declare module '*';
declare module jasmine {
  interface Matchers {
    toBeFile(): boolean;
    toBeVideoWhichContains(text:string): boolean;
  }
}
declare interface Util{
  recognizeTextInVideo(videoPath:string, timemark:string): string;
}
