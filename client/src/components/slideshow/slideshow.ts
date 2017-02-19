import {
  Component, OnInit, AfterContentInit, QueryList, ContentChildren, ElementRef,
  ComponentFactoryResolver, ViewContainerRef, Renderer
} from "@angular/core";
import {SlideComponent} from "../slide/slide";
@Component({
  selector: 'slideshow',
  templateUrl: './slideshow.html'
})
export class SlideshowComponent implements OnInit, AfterContentInit{
  @ContentChildren(SlideComponent) private slides:QueryList<SlideComponent>;
  private slidesSourcecode:string='';
  //@ViewChild('last', {read: ViewContainerRef}) private last:ViewContainerRef;
  constructor(private elementRef: ElementRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private renderer:Renderer) {



  }
  ngOnInit(): void {
    // this.inner=this.sanitizer.bypassSecurityTrustHtml(this.outer.nativeElement.innerHTML);
    // this.outer.nativeElement.innerHTML='';
  }

  // addSlide(content:string) {
  //   let componentFactory=this.componentFactoryResolver.resolveComponentFactory(SlideComponent);
  //   let componentRef=this.viewContainerRef.createComponent(componentFactory);
  //   let component = componentRef.instance;
  //   component.setContent(content);
  //   componentRef.changeDetectorRef.detectChanges();
  //   // this.slides.push(slide);
  //   // let slides = $(this.elementRef.nativeElement).contents().find('.slides');
  //   // let section = $('<section></section>').append(slide);
  //   // slides.append(section);
  //
  // }
  ngAfterContentInit(){
    this.updateSlidesSourcecode();
    this.slides.changes.subscribe(()=>{
      this.updateSlidesSourcecode();
    });
  }
  getSourcecode(){
    return this.elementRef.nativeElement.innerHTML;
  }

  private updateSlidesSourcecode() {
    this.slides.forEach((slide)=>{
      this.slidesSourcecode+=slide.getSourcecode();
    });
  }
}
