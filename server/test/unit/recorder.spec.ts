describe('Recorder', ()=>{
  const recorder:Recorder;
  const browser:Browser;
  const recorderListener:RecorderListener;
  beforeEach(()=>{      browser=jasmine.createSpyObj<Browser>('browser', ['setBrowserListener']);
    recorderListener=jasmine.createSpyObj<RecorderListener>('recorderListener', ['recorded']);
    recorder=new Recorder(browser, clock);
  });
 it('notifiesWhenRecordingIsDone', ()=>{
    recorder.start();
    recorder.stop(); expect(recorderListener.recorded).toHaveBeenCalled();
    recorer.setRecorderListener(recorderListener);
  });
  it('addsFramesToVideo', ()=>{
   
    recorder.paint(UNUSED_FRAME);
    recorder.paint(UNUSED_FRAME); expect(video.addFrame).toHaveBeenCalledTimes(2);
    
  });
  it('endsVideo',()=>{
    recorder.stop();
    expect(video.end).toHaveBeenCalled();
  });
});