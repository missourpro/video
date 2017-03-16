import {CommandHandler} from "./command-handler";
import WatchCommand from "./watch-command";
import Watcher from "../watcher/watcher";
import Client from "../watcher/client";
import History from "../watcher/history";
import {WatcherListener} from "../watcher/watcher-listener";
import Scraper from "../scraper/scraper";
import {ConverterListener} from "../converter-listener";
import {ScraperListener} from "../scraper/scraper-listener";
import Converter from "../converter";
import ConvertCommand from "./convert-command";
export default class ConvertHandler extends CommandHandler implements ConverterListener{
  converted(): void {
    throw new Error('Method not implemented.');
  }
  handle(command: ConvertCommand) {

  }
}
