import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcrTranslatorPage } from './ocr-translator';

@NgModule({
  declarations: [
    OcrTranslatorPage,
  ],
  imports: [
    IonicPageModule.forChild(OcrTranslatorPage),
  ],
})
export class OcrTranslatorPageModule {}
