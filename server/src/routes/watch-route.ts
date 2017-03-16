import {Route} from "./route";
import {WatcherListener} from "../watcher/watcher-listener";
import WatchCommand from "../commands/watch-command";
import CommandBus from "../commands/command-bus";
import CommandProvider from "../commands/command-provider";
import Watcher from "../watcher/watcher";
import Client from "../watcher/client";
import History from "../watcher/history";
export default class WatchRoute extends Route implements WatcherListener{
  route='/watch';

  method=Route.POST;
  handler=this.watch;
  watch(){
    // let watchCommand=new WatchCommand();
    // watchCommand.uri=this.get('uri');
    // let commander=new CommandBus(new CommandProvider());
    // commander.execute(watchCommand);

    let watcher=new Watcher(this, new Client(),  new History());
    watcher.watch(this.get('uri'));
  }

  websiteChanged() {
    console.log('website changed');

  }
}
