import {IllegalStateTransitionException} from "./exceptions/illegal-state-transition-exception";
export abstract class WebsiteWatcherState{
  watch():WebsiteWatcherState{
    throw new IllegalStateTransitionException();
  }
  start():WebsiteWatcherState{
    throw new IllegalStateTransitionException();
  }
  stop():WebsiteWatcherState{
    throw new IllegalStateTransitionException();
  }
}
