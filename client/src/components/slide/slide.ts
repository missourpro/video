import {Component, OnInit, ElementRef} from "@angular/core";
@Component({
  selector: 'slide',
  templateUrl: './slide.html'
})
export class SlideComponent implements OnInit{

  constructor(private elementRef: ElementRef ) {

  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {

  }

  getSourcecode() {
    return this.elementRef.nativeElement.innerHTML;
  }
}
