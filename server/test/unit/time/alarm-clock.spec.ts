import {AlarmClockListener} from "../../../src/time/alarm-clock-listener";
import {AlarmClock} from "../../../src/time/alarm-clock";
fdescribe('AlarmClock', ()=> {
  const TIME_IN_MILLISECONDS=1000;
  const HALF_TIME_IN_MILLISECONDS = TIME_IN_MILLISECONDS/2;
  const DOUBLE_TIME_IN_MILLISECONDS = 2*TIME_IN_MILLISECONDS;
  let alarmClockListener:AlarmClockListener;
  let alarmClock:AlarmClock;
  beforeEach(()=>{
    alarmClockListener=jasmine.createSpyObj<AlarmClockListener>('alarmClockListener', ['wakeUp']);
    alarmClock=new AlarmClock();
    jasmine.clock().install();
  });

  afterEach(()=>{
    jasmine.clock().uninstall();
  });
  it('alertsAtSpecifiedTime',()=>{
    alarmClock.after(TIME_IN_MILLISECONDS, alarmClockListener);
    jasmine.clock().tick(TIME_IN_MILLISECONDS+1);
    expect(alarmClockListener.wakeUp).toHaveBeenCalledTimes(1);
  });
  it('canAlertRepeatedlyAfterSpecifiedTime', ()=>{
    alarmClock.every(TIME_IN_MILLISECONDS, alarmClockListener);
    jasmine.clock().tick(TIME_IN_MILLISECONDS+1);
    jasmine.clock().tick(TIME_IN_MILLISECONDS+1);
    expect(alarmClockListener.wakeUp).toHaveBeenCalledTimes(2);
  });
  it('doesNotAlertAtPreviousSpecifiedTimes',()=>{
    alarmClock.after(TIME_IN_MILLISECONDS, alarmClockListener);
    jasmine.clock().tick(HALF_TIME_IN_MILLISECONDS);
    alarmClock.after(TIME_IN_MILLISECONDS, alarmClockListener);
    jasmine.clock().tick(DOUBLE_TIME_IN_MILLISECONDS+1);
    expect(alarmClockListener.wakeUp).toHaveBeenCalledTimes(1);
  });
  it('doesNotOverrideListenerContext', ()=>{
    (<jasmine.Spy>alarmClockListener.wakeUp).and.callFake(function(){
      expect(this).toEqual(alarmClockListener);
    });
    alarmClock.after(TIME_IN_MILLISECONDS, alarmClockListener);
    jasmine.clock().tick(TIME_IN_MILLISECONDS+1);
  });
});
