import {Route} from "./route";
import Watcher from "../watcher/watcher";
//import History from "../watcher/history";
import Client from "../watcher/client";
import {WatcherListener} from "../watcher/watcher-listener";
export default class WatchRoute extends Route  implements WatcherListener{
  websiteChanged() {
    this.send({uri: this.get('uri')});
  }
  handle() {
    // let watcher: Watcher=new Watcher(this, new Client(), new History);
    // watcher.watch(this.get('uri'));
  }
}
