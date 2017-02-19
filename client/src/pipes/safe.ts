import { Injectable, Pipe } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

/*
  Generated class for the Safe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'safe'
})
@Injectable()
export class SafePipe {
  constructor(private domSanitizer: DomSanitizer){

  }
  /*
   * bypasses security trust.
   */
  transform(value, args) {
    value = value + ''; // make sure it's a string
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }
}
