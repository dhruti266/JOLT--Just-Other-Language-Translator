import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TranslatorProvider} from "../../providers/translator/translator";

@IonicPage()
@Component({
  selector: 'page-reg-translator',
  templateUrl: 'reg-translator.html',
})
export class RegTranslatorPage {

  languages: any = [];
  source: string = "en";
  target: string = "fr";
  text: string = "Hello";
  result: any = [];
  parameters = {
    text: this.text,
    model_id: this.source +"-" + this.target
  };

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
    console.log('ionViewDidLoad RegTranslatorPage');
  }

  translate(){
    this.result = [];
    this.parameters = {
      text: this.text,
      model_id: this.source +"-" + this.target
    };
    console.log(this.parameters);
    this.provider.translate(this.parameters, this.result);
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
