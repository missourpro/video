import Config from "../src/config";
const Tesseract = require('tesseract.js');
const ffmpeg = require('fluent-ffmpeg');
const fs = require("fs");
const path = require("path");

export default class Util{
  static FRAME_TIMEMARK:string = '80%';
  static async recognizeTextInVideo  (videoPath:string, timemark = Util.FRAME_TIMEMARK)  {
    let framePath: string = await Util.extractFrameFromVideo(videoPath, timemark);
    let text: string = await Util.recognizeTextInImage(framePath);
    fs.unlinkSync(framePath);
    return text;
  }
  static async recognizeTextInImage (imagePath:string) : Promise<string> {
  let result = await Tesseract.recognize(imagePath);
  console.log('text recognized --' + result.text + '--');
  return result.text;
}
  static async extractFrameFromVideo(videoPath:string, timemark:string = Util.FRAME_TIMEMARK): Promise<string>{

  const SCREENSHOT_FOLDER = Config.STORAGE_PATH;
  const SCREENSHOT_FILENAME = 'test.png';
  const SCREENSHOT_PATH = path.join(SCREENSHOT_FOLDER, SCREENSHOT_FILENAME);
  ffmpeg.setFfmpegPath(Config.FFMPEG_PATH);
  ffmpeg.setFfprobePath(Config.FFPROBE_PATH);
  let takeScreenshot = (resolve, reject) => {
  ffmpeg(videoPath)
    .on('error', (error) => {
      console.log('frame not extracted at ' + timemark);
      reject(error);
    })
    .on('end', () => {
      console.log('frame extracted at ' + timemark);

      resolve(SCREENSHOT_PATH);
    })
    .screenshots({
      timestamps: [timemark],
      folder: SCREENSHOT_FOLDER,
      filename: SCREENSHOT_FILENAME
    });
};
  return <Promise<string>>new Promise(takeScreenshot);

}}




