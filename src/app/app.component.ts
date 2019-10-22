import {Component, ViewChild} from '@angular/core';
import {Events, MenuController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import {LocalNotifications} from "@ionic-native/local-notifications";
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public menu: MenuController,public events: Events,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  logout(): void{
    this.menu.close();
    this.menu.enable(false);
    this.nav.setRoot(LoginPage);

  }
}

