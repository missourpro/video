import {Component, ContentChild, ElementRef} from '@angular/core';
import {SlideshowComponent} from "../slideshow/slideshow";

@Component({
  selector: 'previewer',
  templateUrl: './previewer.html'
})
export class PreviewerComponent {

  private sourcecode: string='';
  @ContentChild(SlideshowComponent) slideshow: SlideshowComponent;
  private head: string='';
  private body: string='';
  private title:string='Slideshow';
  private foot: string='';
  constructor(private elementRef: ElementRef) {
    this.addMetadata();
    this.addStylesheets();
    this.addScripts();
  }

  private addScripts() {
    this.addJavaScript(`
                    window.onload=function () {
                      Reveal.initialize({
                        postMessage: true,
                        postMessageEvents: true,
                        transition: 'zoom',
                      });
                    };
    `);
    this.addScript(`https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.4.1/js/reveal.js`);
  }

  private addStylesheets() {
    this.addStylesheet(`https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.4.1/css/reveal.css`);
    this.addStylesheet(`https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.4.1/css/theme/black.css`);
  }
  ngAfterContentInit(){
    this.updateSourcecode();
  }
  ngAfterViewInit(){
    this.updateSourcecode();
  }

  private addStylesheet(src: string) {
    this.head+=`<link rel="stylesheet" href="${src}">`;
  }

  private addScript(src: string) {
    this.foot+=`<script src="${src}"></script>`;
  }

  private addMetadata() {
    this.head+= `
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>${this.title}</title>
    `;
  }

  private addJavaScript(sourcecode: string) {
    this.foot+=`<script>${sourcecode}</script>`;
  }

  private updateSourcecode() {
    this.body=this.slideshow.getSourcecode()+this.foot;
    this.sourcecode=`<head>${this.head}</head>`;
    this.sourcecode+=`<body>${this.body}</body>`;
    this.sourcecode=`<html>${this.sourcecode}</html>`
  }
}
