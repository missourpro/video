import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SettingsPage} from '../pages/settings/settings';
import {Paragraphizer} from "../providers/paragraphizer";
import {PreviewPage} from "../pages/preview/preview";
import { SlideshowComponent } from '../components/slideshow/slideshow';
import {SlideComponent} from "../components/slide/slide";
import {SafePipe} from "../pipes/safe";
import {PreviewerComponent} from "../components/previewer/previewer";
import {WebpagePage} from "../pages/webpage/webpage";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    WebpagePage,
    PreviewPage,
    SlideshowComponent,
    SlideComponent,
    PreviewerComponent,
    SafePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WebpagePage,
    SettingsPage,
    PreviewPage,
    SlideshowComponent,
    PreviewerComponent,
    SlideComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Paragraphizer]
})
export class AppModule {}
