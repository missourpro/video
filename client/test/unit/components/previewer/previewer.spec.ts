import {TestUtils} from '../../test';
import {ComponentFixture, async} from "@angular/core/testing";
import {Component, ChangeDetectionStrategy} from "@angular/core";
import {PreviewerComponent} from "../../../../src/components/previewer/previewer";
import {SlideshowComponent} from "../../../../src/components/slideshow/slideshow";
import {SlideComponent} from "../../../../src/components/slide/slide";
let fixture: ComponentFixture<PreviewerComponent> = null;
let instance: any ;
@Component({
  selector: 'test',
  template: `<previewer><slideshow><slide>slide1</slide></slideshow></previewer>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent{

}
describe('PreviewerComponent', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([TestComponent, PreviewerComponent, SlideshowComponent, SlideComponent]).then(compiled => {
    fixture = compiled.fixture;
    instance = fixture.debugElement.children[0].componentInstance;
  })));
  afterEach(() => {
    fixture.destroy();
  });
  it('initialises', ()=>{
    expect(instance).toBeTruthy();
  });
  it('renders body', async(()=>{
    fixture.detectChanges();
    let iframe=$(fixture.nativeElement).find('iframe');
    iframe.on('load', ()=>{
      expect(iframe.contents().find('body')).toContainText('slide1');
    });

  }));
  it('renders head', async(()=>{
    fixture.detectChanges();
    let iframe=$(fixture.nativeElement).find('iframe');
    iframe.on('load', ()=>{
      expect(iframe.contents().find('head')).toExist();
    });
  }));
});
