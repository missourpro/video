import {WebsiteWatcherState} from "../website-watcher-state";
import {StoppedWebsiteWatcherState} from "./stopped-website-watcher-state";
export class StartedWebsiteWatcherState extends WebsiteWatcherState{
  stop(): WebsiteWatcherState {
    return new StoppedWebsiteWatcherState();
  }
}
