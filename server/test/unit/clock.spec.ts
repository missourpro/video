import Clock from "../../src/clock";
import {ClockListener} from "../../src/clock-listener";
describe('Clock', ()=> {
  const TIME_IN_MILLISECONDS=1000;
  const HALF_TIME_IN_MILLISECONDS = TIME_IN_MILLISECONDS/2;
  const DOUBLE_TIME_IN_MILLISECONDS = 2*TIME_IN_MILLISECONDS;
  let clockListener:ClockListener;
  let clock:Clock;
  beforeEach(()=>{
    clockListener=jasmine.createSpyObj<ClockListener>('clockListener', ['setClockListener', 'clockTimeout']);
    clock=new Clock();
    clock.setClockListener(clockListener);
    jasmine.clock().install();
  });

  afterEach(()=>{
    jasmine.clock().uninstall();
  });
  it('reportsTimeoutWhenElapsed',()=>{
    clock.timeoutAfter(TIME_IN_MILLISECONDS);
    jasmine.clock().tick(TIME_IN_MILLISECONDS+1);
    expect(clockListener.clockTimeout).toHaveBeenCalledTimes(1);
  });
  it('doesntReportTimeoutWhenNotElapsed',()=>{
    clock.timeoutAfter(TIME_IN_MILLISECONDS);

    jasmine.clock().tick(HALF_TIME_IN_MILLISECONDS);
    expect(clockListener.clockTimeout).not.toHaveBeenCalled();
  });
  it('ignoresAnyPreviouslyScheduledTimeoutNotElapsed',()=>{
    clock.timeoutAfter(TIME_IN_MILLISECONDS);
    jasmine.clock().tick(HALF_TIME_IN_MILLISECONDS);
    clock.timeoutAfter(TIME_IN_MILLISECONDS);
    jasmine.clock().tick(DOUBLE_TIME_IN_MILLISECONDS+1);
    expect(clockListener.clockTimeout).toHaveBeenCalledTimes(1);
  });
  it('doesntOverrideTimeoutCallbackContext', ()=>{
    (<jasmine.Spy>clockListener.clockTimeout).and.callFake(function(){
      expect(this).toEqual(clockListener);

    });
    clock.timeoutAfter(TIME_IN_MILLISECONDS);
    jasmine.clock().tick(TIME_IN_MILLISECONDS+1);

  });
});
