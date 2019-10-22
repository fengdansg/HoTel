import { Component } from '@angular/core';
import {MenuController, ModalController, NavController, NavParams, Platform} from 'ionic-angular';
//import {SIP} from 'sip.js';
//import{ QRScanner,QRScannerStatus } from '@ionic-native/qr-scanner';
import * as JsSIP from 'jssip';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as SIP from "sip.js";
import {QRScanner} from "@ionic-native/qr-scanner";
import {QrScannerPage} from "../qr-scanner/qr-scanner";
import {CallPage} from "../call/call";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contentstyle:any="hotel";
  phone_number:string='';
  domElement:HTMLMediaElement;
  ua:any;
  constructor(public modalCtrl:ModalController,public platform:Platform,private camera:Camera, private qrScanner:QRScanner,public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController) {
/*    console.log ("STARTING JSSIP");
    JsSIP.debug.enable('JsSIP:*');
    var socket = new JsSIP.WebSocketInterface('wss://tryit.jssip.net'); // change to your url
    var configuration = {
      sockets  : [ socket ],
      uri      : 'sip:alice121212@tryit.jssip.net', // change your credentials
      password : 'superpassword'
    };

    var myPhone = new JsSIP.UA(configuration);
    myPhone.start();*/
    var config = {
      // Replace this IP address with your FreeSWITCH IP address
      uri: '8099@3c-jds.com',

      // Replace this IP address with your FreeSWITCH IP address
      // and replace the port with your FreeSWITCH ws port
      wsServers: 'ws://115.29.8.204:5066',

      // FreeSWITCH Default Username
      authorizationUser: '8099',

      // FreeSWITCH Default Password
      password: '87675020',
      traceSip:true,
      allowLegacyNotifications: true,
      autostart: true,
      register: true,
     // hackIpInContact: true


    };


    console.log("Testing SIP ua-before");
    this.ua = new SIP.UA(config);
    console.log("Testing SIP ua");
    console.log(SIP);
    console.log(this.ua);
    let modalctrl=this.modalCtrl;

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n call number: "+this.phone_number);

    let remoteElement=<HTMLMediaElement>document.getElementById('remoteVideo');

    let ua=this.ua;

    let message = ua.message('8805','Tesing');
    console.log(message.body);
    ua.start();
    ua.on('message',function(message){
      console.log('message');
    });





 ua.on('invite', function(session){
     console.log("session invite: +");

    /*var pc = session.sessionDescriptionHandler.peerConnection;
    var remoteStream = new MediaStream();
    pc.getReceivers().forEach(function(receiver) {
      var track = receiver.track;
      if (track) {
        remoteStream.addTrack(track);
      }
    });
    console.log(remoteElement);
    remoteElement.srcObject = remoteStream;
    remoteElement.play();*/
     session.accept();

     let callModal=modalctrl.create(CallPage,{
       userAgent:ua,
       callNumber:null,
       session:session,
       type:"incoming"
     });
     callModal.present();

   });



  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CallPage');
  }

  viewMenu(): void {
    this.menuCtrl.open();

  }
  onmessage(message) {
    alert(message.body);
  }

  /*async scanQRCode(){
   this.qrScanner.prepare().then((status:QRScannerStatus)=>{
     if(status.authorized){
       let scanSub=this.qrScanner.scan().subscribe((text:string)=>{
         console.log('Scanned something',text);

         this.qrScanner.hide(); //hide camera preview
         scanSub.unsubscribe(); //stopscanning
         this.navCtrl.pop();
       });

       this.qrScanner.resumePreview();
       this.qrScanner.show(); //show camera preview
      // window.document.querySelector('ion-app').classList.add('transparent-body');


     } else if(status.denied){

       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
       alert('denied');

     }else{
       alert('else');
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
    })
     .catch((e:any)=>console.log('Error is',e));

  }*/
  clearnumber(){
    this.phone_number=this.phone_number.slice(0,-1);
    console.log("call.ts phone number is : "+this.phone_number);
  }

  enternumber(num){
    this.phone_number+=num;
    console.log("call.ts phone number is : "+this.phone_number);
  }

  scanQRPage(){
    this.navCtrl.setRoot(QrScannerPage);
// Optionally request the permission early
    //let ionApp = document.getElementsByTagName("ion-app");
    /*this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

          // show camera preview
          window.document.querySelector('ion-app').classList.add('transparentBody');
          //ionApp.style.display = ‘none’;
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          this.qrScanner.openSettings();
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));*/

  }

  callnumber(){


    let callModal=this.modalCtrl.create(CallPage,{
      userAgent:this.ua,
      callNumber:this.phone_number,
      session:null,
      type:"outgoing"
    });
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n call number: "+this.phone_number);

    callModal.present();
    /* var myModifier = function(description) {
       description.sdp = description.sdp.replace(/^a=candidate:\d+ \d+ tcp .*?\r\n/img, "");
       return Promise.resolve(description);
     };

     var modifierArray = [myModifier, SIP.WebRTC.Modifiers.stripTelephoneEvent];*/

    // domElement.srcObject=remoteStream;


    //domElement.play();
    //////////////////////////////////////////////////////////////////////////////////////

   /* let remoteElement=<HTMLMediaElement>document.getElementById('remoteVideo');

    var options = {

      inviteWithoutSdp:false,
      media:{

        local:{
          video:document.getElementById('localVideo'),
        },
        remote:{
          audio:remoteElement,
          video:remoteElement
        }


      },


    };

    let session = this.ua.invite(this.phone_number,{
      options:options,
      sessionDescriptionHandlerFactoryOptions:{
        constraints:{
          audio:true,
          video:false
        }
      },
      mediaConstraints:{
        audio:true,
        video:false
      }
    });

    this.ua.on('invite',function(session){

      session.accept();
    });

    console.log("print session!!!!!!!!!!");
    console.log(session);

    session.on('accepted',function(){
      console.log('inside function');
      console.log(session);
      var pc = session.sessionDescriptionHandler.peerConnection;
      var remoteStream = new MediaStream();
      pc.getReceivers().forEach(function(receiver) {
        var track = receiver.track;
        if (track) {
          remoteStream.addTrack(track);
        }
      });
      remoteElement.srcObject = remoteStream;
      remoteElement.play();
    })

    session.on('terminated',function(){

    })*/
    /////////////////////////////////////////////////////////////////////

    /*var simple =new SIP.WebRTC.Simple(options);
    simple.on('connected',function(){
      remoteElement.style.visibility='visible';
     });

     var endButton = document.getElementById('endCall');
     endButton.addEventListener("click", function () {
       simple.hangup();
       alert("Call Ended");
     }, false);

    simple.call('7101@3c-jds.com'); */

    /* var session = ua.invite('7101@3c-jds.com');

      var session= new SIP.Session;
      ua.on('invite',function(session){
        session.accept();
      });

      ua.on('connected',function(){
        remoteElement.style.visibility='visible;'
      });
      var pc = session.SessionDescriptionHandler.peerConnection;
      var remoteStream = new MediaStream();
      pc.getReceivers().forEach(function(receiver) {
        var track = receiver.track;
        if (track) {
          remoteStream.addTrack(track);
        }
      });
      remoteElement.srcObject = remoteStream;
      remoteElement.play();*/

    /*

       let session = ua.invite('7101@3c-jds.com',{
         options:options,
         sessionDescriptionHandlerOptions:{
           constraints:{
             audio:true,
             video:false
           },

         }
       });

        ua.on('invite',function(session){
          session.accept();
        });

        ua.on('connected',function(){
          remoteElement.style.visibility='visible;'
        });*/







    /* ua.message('4400@3c-jds.com',"Hello !");
     ua.on('message', function (message) {
       console.log(message.body);
     });*/

    /*var options = {
      media: {
        local: {
         video: document.getElementById('localVideo'),
          audio: document.getElementById('remoteVideo')
        },
        remote: {
         // video: document.getElementById('remoteVideo'),
          // This is necessary to do an audio/video call as opposed to just a video call
          audio: document.getElementById('remoteVideo')
        }
      },
      ua: {}
    };*/
    // var simple = new SIP.WebRTC.Simple(options);

    /* var endButton = document.getElementById('endCall');
     endButton.addEventListener("click", function () {
       simple.hangup();
       alert("Call Ended");
     }, false);*/

//makes the call
    //simple.call('7302@3c-jds.com');

  }

  unregisterSIP(){
    this.ua.unregister();
  }
}
