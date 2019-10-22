import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {TabPage} from "../tab/tab";
import * as JsSIP from  'jssip' ;


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public menu:MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  scanCode(){
  /*  console.log ("STARTING JSSIP");
    JsSIP.debug.enable('JsSIP:*');
    var socket = new JsSIP.webSocket('wss://tryit.jssip.net') ;// change to your url
    var configuration = {
      sockets  : [ socket ],
      uri      : 'sip:alice121212@tryit.jssip.net', // change your credentials
      password : 'superpassword'
    };*/

    //var myPhone = new JsSIP.UA(configuration);


    //this.menu.enable(true);

    this.navCtrl.setRoot(TabPage);
  }

}
