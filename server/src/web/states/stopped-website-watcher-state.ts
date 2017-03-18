import {WebsiteWatcherState} from "../website-watcher-state";
import {StartedWebsiteWatcherState} from "./started-website-watcher-state";
export class StoppedWebsiteWatcherState extends WebsiteWatcherState{

  start(): WebsiteWatcherState {
    return new StartedWebsiteWatcherState();
  }
}
