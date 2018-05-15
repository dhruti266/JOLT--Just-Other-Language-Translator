import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TranslatorProvider} from "../../providers/translator/translator";

/**
 * Generated class for the OcrTranslatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ocr-translator',
  templateUrl: 'ocr-translator.html',
})
export class OcrTranslatorPage {

  imgURL: string;
  languages: any = [];
  source: any;
  result: any = [];
  text: any;
  target: string = 'en';
  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: TranslatorProvider) {
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
    console.log('ionViewDidLoad OcrTranslatorPage');
  }

  translate(){
    this.provider.getOCRData(this.imgURL).then(data => {
      console.log(data);
      this.text = data["ParsedResults"][0]["ParsedText"];
      this.provider.identifySource(this.text, this.source, this.result, this.target);
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

}
