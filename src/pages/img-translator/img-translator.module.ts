import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgTranslatorPage } from './img-translator';

@NgModule({
  declarations: [
    ImgTranslatorPage,
  ],
  imports: [
    IonicPageModule.forChild(ImgTranslatorPage),
  ],
})
export class ImgTranslatorPageModule {}
