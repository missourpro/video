export interface VideoListener{
  videoEnded();
}

export class NullVideoListener implements VideoListener{
  videoEnded() {

  }


}
