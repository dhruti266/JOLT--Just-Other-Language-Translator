import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import watson from 'watson-developer-cloud/language-translator/v2';
import { TextToSpeech } from '@ionic-native/text-to-speech';


@Injectable()
export class TranslatorProvider {

  apiUrl: any =   {
    "url": "https://gateway.watsonplatform.net/language-translator/api/v2/translate",
    "username": "ed5bba02-edb2-4c90-8f5b-5a1bd260c194",
    "password": "kFS2HffgOmAh"
  };
  LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

  languageTranslator = new this.LanguageTranslatorV2({
    username: 'ed5bba02-edb2-4c90-8f5b-5a1bd260c194',
    password: 'kFS2HffgOmAh',
    version: 'v2'
  });

  constructor(public http: HttpClient, private tts: TextToSpeech) {
    console.log('Hello TranslatorProvider Provider');
  }

  getOCRData(imgURL: string) {
    return new Promise(resolve => {
      this.http.get("https://api.ocr.space/parse/imageurl?apikey=72f3d4030c88957&url="+imgURL).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  translate(parameters: any, result: any){
    var val: any = {};
    this.languageTranslator.translate(
      parameters,
      function(error, response) {
        if (error)
          console.log(error);
        else{
          result.pop();
          result.push(response["translations"][0]["translation"]);
        }
      }
    );
  }
  speak(text: string){
    var parameters = {
      text: text
    };
  this.tts.speak(parameters)
  .then(() => console.log('Success'))
  .catch((reason: any) => console.log(reason));
  }

identifySource(text: string, source: any, result: any, target: any){
    var self = this;
    var parameters = {
      text: text
    };
    this.languageTranslator.identify(
      parameters,
      function(error, response) {
        if (error){
          console.log(error);
        }
        else{
          source = response["languages"][0]["language"];
          self.translate({text: text, model_id: source + "-" + target}, result)
        }
      }
    );


}}
