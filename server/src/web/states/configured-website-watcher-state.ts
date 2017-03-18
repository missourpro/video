import {WebsiteWatcherState} from "../website-watcher-state";
import {StartedWebsiteWatcherState} from "./started-website-watcher-state";
export class ConfiguredWebsiteWatcherState extends WebsiteWatcherState{

  start(): WebsiteWatcherState {
    return new StartedWebsiteWatcherState;
  }
}
