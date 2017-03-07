import {CommandHandler} from "./command-handler";
import WatchCommand from "./watch-command";
import Watcher from "../watcher/index";
import Client from "../watcher/client";
import History from "../watcher/history";
import {WatcherListener} from "../watcher/watcher-listener";
import Scraper from "../scraper/index";
import {ConverterListener} from "../converter-listener";
import {ScraperListener} from "../scraper/scraper-listener";
import Converter from "../converter";
import CreateVideoWhenWebsiteChanged from "../events/create-video-when-website-changed";
import WebsiteChanged from "../events/website-changed";
export default class WatchHandler extends CommandHandler implements WatcherListener, ConverterListener, ScraperListener{
  scraped(page: any) {
    throw new Error('Method not implemented.');
  }

  converted(): void {
    throw new Error('Method not implemented.');
  }

  websiteChanged(uri: string) {
    let event=new WebsiteChanged();
    event.uri=uri;
    this.dispatcher.dispatch(event);
  }
  handle(command: WatchCommand) {
    let watcher=new Watcher(this, new Client(), new History());
    watcher.watch(command.uri);
  }
}
