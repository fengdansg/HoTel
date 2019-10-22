import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AndroidPermissions } from '@ionic-native/android-permissions';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import {CallPage} from "../call/call";


/**
 * Generated class for the QrScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-scanner',
  templateUrl: 'qr-scanner.html',
})
export class QrScannerPage {

  tabBarElement:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private qrScanner:QRScanner) {
    this.qrscanner();
    this.tabBarElement=document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrScannerPage');

  }
  ionViewWillEnter(){
   this.tabBarElement.style.display='none';
  }

  ionViewWillLeave(){
    this.tabBarElement.style.display='flex';
    this.qrScanner.hide(); // hide camera preview
    this.hideCamera();
  }

  qrscanner(){
    // Optionally request the permission early
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          //alert('authorized');

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
           // alert(text);
            this.qrScanner.hide(); // hide camera preview
            this.hideCamera();
            scanSub.unsubscribe(); // stop scanning
            this.navCtrl.pop();
          });

          this.qrScanner.resumePreview();
          this.showCamera()
          // show camera preview
          this.qrScanner.show()
            .then((data : QRScannerStatus)=> {
              //alert(data.showing);
            },err => {
              //alert(err);

            });

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          this.qrScanner.openSettings();
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          //alert('else');
        }
      })
      .catch((e: any) => {
        alert('Error is' + e);
      });

  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  exitScan(){
    this.navCtrl.setRoot(CallPage);

  }

}
