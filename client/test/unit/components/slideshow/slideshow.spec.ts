import {TestUtils} from "../../test";
import { ComponentFixture, async } from '@angular/core/testing';
import {SlideshowComponent} from ".../../../../src/components/slideshow/slideshow";
import {Component, ChangeDetectionStrategy} from "@angular/core";
import {SlideComponent} from "../../../../src/components/slide/slide";
let fixture: ComponentFixture<SlideshowComponent> = null;
let instance: any ;
@Component({
  selector: 'test',
  template: `<slideshow><slide>slide1</slide><slide>slide2</slide></slideshow>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent{

}
describe('SlideshowComponent', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([TestComponent, SlideshowComponent, SlideComponent]).then(compiled => {
    fixture = compiled.fixture;
    instance = fixture.debugElement.children[0].componentInstance;
  })));

  afterEach(() => {
    fixture.destroy();
  });
  it('initialises', ()=>{
    expect(instance).toBeTruthy();
  });
  it('shows slides', async(()=>{
    fixture.detectChanges();
    expect($(fixture.nativeElement).find('section')).toHaveLength(2);
    expect($(fixture.nativeElement).find('section:first')).toContainText('slide1');
    expect($(fixture.nativeElement).find('section:last')).toContainText('slide2');
  }));

});
