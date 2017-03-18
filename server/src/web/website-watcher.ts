import {WebsiteWatcherState} from "./website-watcher-state";
import {ConfiguredWebsiteWatcherState} from "./states/configured-website-watcher-state";
import {WebsiteChangeDetector} from "./website-change-detector";
export class WebsiteWatcher{
  private state:WebsiteWatcherState;
  private uri;
  constructor(private websiteChangeDetector: WebsiteChangeDetector){

  }
  watch(uri:string){
    this.uri=uri;
    this.setState(new ConfiguredWebsiteWatcherState());
  }
  start(){
    this.setState(this.state.start());
  }
  stop(){
    this.setState(this.state.stop());
  }
  protected setState(state:WebsiteWatcherState){
    this.state=state;
  }
}
