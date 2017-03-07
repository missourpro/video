import Watcher from "../../src/watcher";
import Client from "../../src/watcher/client";
import {WatcherListener} from "../../src/watcher/watcher-listener";
import History from "../../src/watcher/history";
describe('Watcher', ()=> {
  let client:Client;
  let watcherListener:WatcherListener;
  const FAKE_WEBSITE_URI:string='http://www.fake.com';
  const ORIGINAL_HTML:string='<html><body></body></html>';
  const CHANGED_HTML:string='<html><body>CHANGE</body></html>';
  let history:History;
  const WATCH_INTERVAL = 10000;

  beforeEach(async() => {
    client =jasmine.createSpyObj<Client>('client', ['fetch', 'setClientListener']);
    watcherListener=jasmine.createSpyObj<WatcherListener>('watcherListener', ['websiteChanged']);
    history=new History();
    //spyOn(his, ['save', 'latest', 'empty']);
    jasmine.clock().install();
  });
  afterEach(async() => {
    jasmine.clock().uninstall();
  });
  it('notifiesWebsiteChanged',  ()=>{
    let watcher:Watcher=new Watcher(watcherListener, client, history);
    watcher.watch(FAKE_WEBSITE_URI);
    watcher.websiteFetched(ORIGINAL_HTML);
    jasmine.clock().tick(WATCH_INTERVAL);
    watcher.websiteFetched(CHANGED_HTML);
    expect(watcherListener.websiteChanged).toHaveBeenCalledTimes(1);
  });
  it('fetchesWebsitePeriodically', ()=>{
    let watcher:Watcher=new Watcher(watcherListener, client, history);
    watcher.watch(FAKE_WEBSITE_URI);
    watcher.websiteFetched(ORIGINAL_HTML);
    jasmine.clock().tick(WATCH_INTERVAL);
    expect(client.fetch).toHaveBeenCalledTimes(2);
  });
  it('savesWebsiteSnapshotForTheFirstTime', ()=>{
    spyOn(history, 'save').and.callThrough();
    let watcher:Watcher=new Watcher(watcherListener,client, history);
    watcher.watch(FAKE_WEBSITE_URI);
    watcher.websiteFetched(ORIGINAL_HTML);
    expect(history.save).toHaveBeenCalledTimes(1);
  });
  it('savesWebsiteSnapshotNextTimeOnlyIfthereIsAChange', ()=>{
    spyOn(history, 'save').and.callThrough();
    let watcher:Watcher=new Watcher(watcherListener,client, history);
    watcher.watch(FAKE_WEBSITE_URI);
    watcher.websiteFetched(ORIGINAL_HTML);
    jasmine.clock().tick(WATCH_INTERVAL);
    watcher.websiteFetched(ORIGINAL_HTML);
    jasmine.clock().tick(WATCH_INTERVAL);
    watcher.websiteFetched(CHANGED_HTML);
    jasmine.clock().tick(WATCH_INTERVAL);
    watcher.websiteFetched(CHANGED_HTML);
    expect(history.save).toHaveBeenCalledTimes(2);
  });
  it('doesntFetchWhenStopped', ()=>{
    let watcher:Watcher=new Watcher(watcherListener,client, history);
    watcher.watch(FAKE_WEBSITE_URI);
    watcher.stop();
    jasmine.clock().tick(WATCH_INTERVAL);
    expect(client.fetch).toHaveBeenCalledTimes(1);
  });
  it('doesntNotifyAboutAnyWebsiteChangeWhenStopped', ()=>{
    let watcher:Watcher=new Watcher(watcherListener,client, history);
    watcher.watch(FAKE_WEBSITE_URI);
    watcher.websiteFetched(ORIGINAL_HTML);
    jasmine.clock().tick(WATCH_INTERVAL);
    watcher.stop();
    watcher.websiteFetched(CHANGED_HTML);
    expect(watcherListener.websiteChanged).not.toHaveBeenCalled();
  });
  it('doesntFetchUntilPreviousFetchRequestDidFinish', ()=>{
    let watcher:Watcher=new Watcher(watcherListener,client, history);
    watcher.watch(FAKE_WEBSITE_URI);
    jasmine.clock().tick(WATCH_INTERVAL);
    jasmine.clock().tick(WATCH_INTERVAL);
    watcher.websiteFetched(ORIGINAL_HTML);
    expect(client.fetch).toHaveBeenCalledTimes(1);
  });
});
