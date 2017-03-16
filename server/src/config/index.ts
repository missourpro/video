import * as path from "path";
import * as fs from "fs";
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
  static SERVER_KEY=fs.readFileSync(path.join(Config.ROOT_PATH, 'server.key') );
  static SERVER_CERTIFICATE=fs.readFileSync(path.join(Config.ROOT_PATH, 'server.crt') );
  //TODO rename ".bots"
  static DATABASE_PATH: string=path.join(Config.STORAGE_PATH,'database.sqlite3');
}
