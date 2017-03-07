import Client from "../../../src/watcher/client";
import {ClientListener} from "../../../src/watcher/client-listener";
describe('Client', ()=> {
  let clientListener:ClientListener;
  beforeEach(() => {
    clientListener=jasmine.createSpyObj<ClientListener>('clientListener', ['websiteFetched']);
  });
  afterEach(() => {

  });
  it('fetchesHespress',  (done)=>{
    let client:Client=new Client();
    client.setClientListener(clientListener);
    client.fetch('http://www.hespress.com');
    (<jasmine.Spy>clientListener.websiteFetched).and.callFake((html:string)=>{
      expect(html.length).toBeGreaterThan(0);
      done();
    });
  });
});
