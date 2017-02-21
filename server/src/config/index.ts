import * as path from "path";
const APP_ROOT_PATH=require("app-root-path");
const prependHttp=require('prepend-http');
export default class Config{
  static ELECTRON_PATH= '';
  static ROOT_PATH=APP_ROOT_PATH+'';
  static PUBLIC_PATH=path.join(Config.ROOT_PATH, 'www');
  static SERVER_HOST= 'localhost';
  static SERVER_PORT= 8080;
  static SERVER_URI=prependHttp(Config.SERVER_HOST+':'+Config.SERVER_PORT);
  static STORAGE_PATH = path.join(Config.ROOT_PATH,'storage');
  static FFMPEG_PATH = path.join(Config.ROOT_PATH,  'node_modules', 'ffmpeg', 'ffmpeg');
  static FFPROBE_PATH= path.join(Config.ROOT_PATH,  'node_modules', 'ffmpeg', 'ffprobe');
}
