import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OcrTranslatorPageModule} from "../ocr-translator/ocr-translator.module";
import {OcrTranslatorPage} from "../ocr-translator/ocr-translator";
import {RegTranslatorPage} from "../reg-translator/reg-translator";
import {ImgTranslatorPage} from "../img-translator/img-translator";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ocrTranslator(){
    this.navCtrl.push(OcrTranslatorPage);
  }

  regTranslator(){
    this.navCtrl.push(RegTranslatorPage);
  }

  imgTranslator(){
    this.navCtrl.push(ImgTranslatorPage);
  }
}
