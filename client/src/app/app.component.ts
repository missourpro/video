import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, App } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import {SettingsPage} from '../pages/settings/settings';
import {WebpagePage} from "../pages/webpage/webpage";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{id: string, title: string, component: any}>;

  constructor(public platform: Platform,  public menu: MenuController,private app: App) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      {id:'home', title: 'Home', component: HomePage },
      {id:'webpage', title: 'Webpage', component: WebpagePage },
      {id:'settings', title: 'Settings', component: SettingsPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
    this.app.setTitle(page.title);
  }
  getPage(title){
    const [page]=this.pages.filter((page)=>{
      return page.title==title;
    });
    return page;
  }
}
