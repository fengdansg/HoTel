import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, MenuController, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import{ QRScanner,QRScannerStatus ,} from '@ionic-native/qr-scanner';
import {QrScannerPage} from "../qr-scanner/qr-scanner";
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as SIP from "sip.js";
import * as moment from "moment";


/**
 * Generated class for the CallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage {
  contentstyle:any="hotel";
  phone_number:string='';
  domElement:HTMLMediaElement;
  sessionEvent:any;
  ua:any;
  config:any;
  //eventStatus:any;
  callMessage:string='calling...';
  callTerminate:any=false;
  type:any;
  callStatus:any=false;
  timeVar:any;

  //options: QRScannerStatus;
  constructor(public event:Events,public viewCtrl:ViewController,public params:NavParams,public platform:Platform,private camera:Camera, private qrScanner:QRScanner,public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController) {

    platform.ready().then(()=>{
      console.log("Platform is ready !")
    });
    this.ua=params.get('userAgent');
    this.phone_number=params.get('callNumber');
    this.type=params.get('type')
    console.log("phone number: "+this.phone_number);
    console.log("Testing SIP ua-before");
    //this.ua = new SIP.UA(this.config);
    console.log("Testing SIP ua");
    console.log(SIP);
    console.log(this.ua);



    let remoteElement=<HTMLMediaElement>document.getElementById('remoteVideo');

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>RemoteElement")
    console.log(remoteElement)
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

if(this.type=='outgoing'){
  console.log("outgoing call>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  this.callStatus=true;
  this.sessionEvent = this.ua.invite(this.phone_number,{
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
}else if(this.type=="incoming"){
  console.log("incomming call>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  this.callStatus=false;
  this.sessionEvent=params.get('session');
  if(this.sessionEvent==null){
    console.log("session for incoming is null");
  }

}


    this.sessionEvent.on('connecting',function(){
      this.sessionEvent.dtmf(1);
    });
    //this.sessionEvent=session;

   /* this.ua.on('invite',function(session){

      session.accept();
    });*/

    console.log("print session!!!!!!!!!!");
    console.log(this.sessionEvent);

    let session=this.sessionEvent;

     let msg=this.callMessage;
     let eventListener=this.event;
    session.on('accepted',function(){
      console.log('inside function');
      console.log(session);

      msg="accepted";
      eventListener.publish('callMsg',msg,Date.now());
      let pc;


        pc = session.sessionDescriptionHandler.peerConnection;


      var remoteStream = new MediaStream();
      pc.getReceivers().forEach(function(receiver) {
        var track = receiver.track;
        if (track) {
          remoteStream.addTrack(track);
        }
      });
      console.log(remoteElement);
      remoteElement.srcObject = remoteStream;
      remoteElement.play();
    });
    let timer=moment.duration(1,'seconds');
    let myVar;

    eventListener.subscribe('callMsg',(message, time)=>{
     // this.callMessage=message;
      console.log("message change")
       myVar=setInterval(function(){

        timer.add(1,'seconds');
        eventListener.publish('timer',timer);
      }, 1000);
    });

   this.timeVar=myVar;
   eventListener.subscribe('timer',(timer)=>{
     this.callMessage= timer.minutes()+":"+timer.seconds();
     console.log("timer:"+this.callMessage);
   })



    var view=this.viewCtrl;
     let callEnd =false;
    this.sessionEvent.on('terminated',function(){
      view.dismiss();
      clearInterval(myVar);
      callEnd=true;
    })


  }


  ionViewDidEnter(){


  }

 closePage(){
    this.viewCtrl.dismiss();
 }


 dismiss() {
   this.sessionEvent.terminate();
   clearInterval(this.timeVar);

    //delete this conversation,

   //this.viewCtrl.dismiss();
    //hang up the call
 }

 acceptCall(){
   this.callStatus=true;
   this.sessionEvent.accept();
 }
 rejectCall(){
   this.sessionEvent.reject();
   setInterval(function(){
     if(this.viewCtrl!=null){
       this.viewCtrl.dismiss()
     }
    },2000);
 }


}
