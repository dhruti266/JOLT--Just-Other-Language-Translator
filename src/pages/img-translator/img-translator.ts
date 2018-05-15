import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import watson from 'watson-developer-cloud/language-translator/v2';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {User} from "firebase/app";
import firebase from "firebase";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {TranslatorProvider} from "../../providers/translator/translator";
declare var window: any;

@IonicPage()
@Component({
  selector: 'page-img-translator',
  templateUrl: 'img-translator.html',
})
export class ImgTranslatorPage {

  picData: any;
  picdata: any;
  mypicref: any;
  imgURL: any = "https://firebasestorage.googleapis.com/v0/b/jolt-aef24.appspot.com/o/jolt?alt=media";
  public Fbref:any;

  languages: any = [];
  source: any;
  result: any = [];
  text: any;
  target: string = 'en';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private afDatabase :AngularFireDatabase, public camera :Camera, public provider: TranslatorProvider) {

    this.mypicref = firebase.storage().ref('/');
    this.Fbref = firebase.storage().ref('/');
    this.picData = firebase.storage().ref('/jolt').getDownloadURL()
      .then(function(url){
        console.log("log1: " + url);
        return url;
      }).catch(res=>{
        console.log("errrrrrrrrrrrrrrrrrrrrrr");
      });

    this.languages.push({
      'full': 'English',
      'short': 'en'
    });

    this.languages.push({
      'full': 'Arabic',
      'short': 'ar'
    });

    this.languages.push({
      'full': 'French',
      'short': 'fr'
    });

    this.languages.push({
      'full': 'German',
      'short': 'de'
    });

    this.languages.push({
      'full': 'Italian',
      'short': 'it'
    });

    this.languages.push({
      'full': 'Japanese',
      'short': 'ja'
    });

    this.languages.push({
      'full': 'Portuguese',
      'short': 'pt'
    });

    this.languages.push({
      'full': 'Korean',
      'short': 'ko'
    });

    this.languages.push({
      'full': 'Spanish',
      'short': 'es'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImgTranslatorPage');
  }

  takePic(){
    this.camera.getPicture({
      quality:100,
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.CAMERA,
      encodingType:this.camera.EncodingType.PNG,
      saveToPhotoAlbum:true
    }).then(imagedata=>{
      this.picdata = imagedata;
      this.uploadPic();
    });
  }

  uploadPic(){

    this.mypicref.child('jolt').putString(this.picdata,'base64', {contentType: 'image/png'})
      .then(savepic=>{
        this.picData['i'] = savepic.downloadURL
      })
  }

  getMedia(){
    this.camera.getPicture({
      sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType:this.camera.MediaType.ALLMEDIA,
      destinationType:this.camera.DestinationType.FILE_URI
    }).then(fileuri=>{

      window.resolveLocalFileSystemURL("file://"+fileuri, EF=>{
        EF.file(file=>{
          const FR = new FileReader()
          FR.onloadend=(res:any)=>{
            let AF = res.target.result
            let blob = new Blob([new Uint8Array(AF)],{type:'image/png'})
            this.upload(blob);
          };
          FR.readAsArrayBuffer(file);
          // this.translate();
        })
      })
    })
  }



  translate(){
    this.provider.getOCRData(this.imgURL).then(data => {
      console.log(data);
      this.text = data["ParsedResults"][0]["ParsedText"];
      this.provider.identifySource(this.text, this.source, this.result, this.target);
      console.log("result: ");
      console.log(
        this.result
      );
    });
  }

  speak(){
    if(this.result[0] === undefined){
      this.provider.speak('I Couldn\'t find any text! Current version only supports English and French translations.');
    }
    else{
      this.provider.speak(this.result[0]);
    }
  }

  upload(blob:Blob){
    this.Fbref.child('jolt').put(blob).then(savepic=>{
      this.picData['i'] = savepic.downloadURL
      this.translate();
    });
  }

}
