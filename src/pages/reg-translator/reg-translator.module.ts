import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegTranslatorPage } from './reg-translator';

@NgModule({
  declarations: [
    RegTranslatorPage,
  ],
  imports: [
    IonicPageModule.forChild(RegTranslatorPage),
  ],
})
export class RegTranslatorPageModule {}
