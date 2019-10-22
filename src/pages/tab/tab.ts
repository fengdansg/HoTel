import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {CallPage} from "../call/call";
import {ServicesPage} from "../services/services";
import {MessagePage} from "../message/message";
import {NewsPage} from "../news/news";
import {HomePage} from "../home/home";

/**
 * Generated class for the TabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {
  tab1Root: any = HomePage;
  tab2Root:any = ServicesPage;
  tab3Root: any = MessagePage;
  tab4Root: any = NewsPage;


  constructor(public navCtrl: NavController, public events:Events,public navParams: NavParams) {
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);



  }

  changeTab() {

    console.log('change tab page')
  }

}
