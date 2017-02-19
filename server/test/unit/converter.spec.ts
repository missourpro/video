import {ConverterListener} from "../../src/converter-listener";
import Converter from "../../src/converter";
import {Browser} from "../../src/browser";
import {Video} from "../../src/video";
import Clock from "../../src/clock";
describe('Converter', ()=>{
  const UNUSED_HTML: string='';
  const UNUSED_CONVERTER_LISTENER: ConverterListener=jasmine.createSpyObj<ConverterListener>('unusedConverterListener', ['converted']);
  const UNUSED_BROWSER: Browser=jasmine.createSpyObj<Browser>('unusedBrowser', ['open', 'getBrowserListener', 'setBrowserListener']);
  const UNUSED_VIDEO: Video=jasmine.createSpyObj<Video>('unusedVideo', ['addFrame', 'end', 'getVideoListener', 'setVideoListener']);
  const UNUSED_CLOCK:Clock=jasmine.createSpyObj<Clock>('unusedClock', ['setClockListener', 'timeoutAfter']);
  const UNUSED_FRAME:Buffer=new Buffer(0);

  let html: string;
  let converterListener: ConverterListener;
  let browser: Browser;
  let video: Video;
  let frame:Buffer;
  let clock: Clock;

  beforeEach(()=>{
    html='';
    converterListener=jasmine.createSpyObj<ConverterListener>('converterListener', ['converted']);
    browser=jasmine.createSpyObj<Browser>('browser', ['open', 'getBrowserListener', 'setBrowserListener']);
    video=jasmine.createSpyObj<Video>('video', ['addFrame', 'end', 'getVideoListener', 'setVideoListener']);
    frame=new Buffer(0);
    clock=jasmine.createSpyObj<Clock>('clock', ['setClockListener', 'timeoutAfter']);
  });
  afterEach(()=>{
  });
  it('convertsHtmlToVideo', ()=>{
    let converter:Converter=new Converter(UNUSED_CONVERTER_LISTENER, browser, video, clock);
    converter.convert(UNUSED_HTML);

    converter.browserPainted(UNUSED_FRAME);
    converter.browserPainted(UNUSED_FRAME);
    converter.browserPainted(UNUSED_FRAME);
    converter.clockTimeout();


    expect(browser.open).toHaveBeenCalled();
    expect(video.addFrame).toHaveBeenCalledTimes(3);
    expect(video.end).toHaveBeenCalledTimes(1);
  });
  it('', ()=>{
    //let converter:Coverter=new Converter(converterListener, video)
  });
  it('notifiesWhenVideoConversionIsDone', ()=>{
    let converter: Converter=new Converter(converterListener, UNUSED_BROWSER, UNUSED_VIDEO, UNUSED_CLOCK);
    converter.videoEnded();
    expect(converterListener.converted).toHaveBeenCalledTimes(1);
  });
  it('reportsFailedConversion', ()=>{
    //TODO
  });
  it('addsReceivedFrameToVideo', ()=>{
    let converter: Converter=new Converter(UNUSED_CONVERTER_LISTENER, UNUSED_BROWSER, video, UNUSED_CLOCK);
    converter.browserPainted(UNUSED_FRAME);
    expect(video.addFrame).toHaveBeenCalledTimes(1);
  });
  it('opensHtmlInBrowser',()=>{
    let converter: Converter=new Converter(UNUSED_CONVERTER_LISTENER, browser, UNUSED_VIDEO, UNUSED_CLOCK);
    converter.convert(UNUSED_HTML);
    expect(browser.open).toHaveBeenCalled();
  });
  it('endsVideoWhenNoFrameLeft',()=>{
    let converter: Converter=new Converter(UNUSED_CONVERTER_LISTENER, UNUSED_BROWSER, video, clock);
    converter.clockTimeout();
    expect(video.end).toHaveBeenCalled();
  });


});
