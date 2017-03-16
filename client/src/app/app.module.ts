import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HomePage } from '../pages/home/home';
import {SettingsPage} from '../pages/settings/settings';
import {Paragraphizer} from "../providers/paragraphizer";
import {PreviewPage} from "../pages/preview/preview";
import {SlideshowComponent } from '../components/slideshow/slideshow';
import {SlideComponent} from "../components/slide/slide";
import {SafePipe} from "../pipes/safe";
import {PreviewerComponent} from "../components/previewer/previewer";
import {WebpagePage} from "../pages/webpage/webpage";
import {Storage}  from "@ionic/storage";
import {WebsocketTransport} from "../services/client/websocket-tansport";
import {Client} from "../services/client/client";
import {RoboticsService} from "../services/robotics-service";
import {BotFactoryPage} from "../pages/robotics/bot-factory";
import {BotPage} from "../pages/robotics/bot";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    WebpagePage,
    PreviewPage,
    BotFactoryPage,
    BotPage,
    SlideshowComponent,
    SlideComponent,
    PreviewerComponent,
    SafePipe,
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
    BotFactoryPage,
    BotPage,
    SlideshowComponent,
    PreviewerComponent,
    SlideComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    Paragraphizer,
    WebsocketTransport,
    RoboticsService,
    {provide: Client, useFactory: (transport)=>{
      return new Client(transport);
      }, deps: [WebsocketTransport]
    }
  ]
})
export class AppModule {}
