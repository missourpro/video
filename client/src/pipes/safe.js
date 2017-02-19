var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Pipe } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
/*
  Generated class for the Safe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
export var SafePipe = (function () {
    function SafePipe(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    /*
     * bypasses security trust.
     */
    SafePipe.prototype.transform = function (value, args) {
        value = value + ''; // make sure it's a string
        return this.domSanitizer.bypassSecurityTrustHtml(value);
    };
    SafePipe = __decorate([
        Pipe({
            name: 'safe'
        }),
        Injectable(), 
        __metadata('design:paramtypes', [DomSanitizer])
    ], SafePipe);
    return SafePipe;
}());
//# sourceMappingURL=safe.js.map