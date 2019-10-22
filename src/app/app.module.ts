import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {CallPage} from "../pages/call/call";
import {LoginPage} from "../pages/login/login";
import {MessagePage} from "../pages/message/message";
import {ServicesPage} from "../pages/services/services";
import {TabPage} from "../pages/tab/tab";
import {NewsPage} from "../pages/news/news";
import {QRScanner} from "@ionic-native/qr-scanner";
import { Camera, CameraOptions } from '@ionic-native/camera';
import {QrScannerPage} from "../pages/qr-scanner/qr-scanner";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CallPage,
    LoginPage,
    MessagePage,
    ServicesPage,
    TabPage,
    NewsPage,
    QrScannerPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsHideOnSubPages:true,})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CallPage,
    LoginPage,
    MessagePage,
    ServicesPage,
    TabPage,
    NewsPage,
    QrScannerPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    QRScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
