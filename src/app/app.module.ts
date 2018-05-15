import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {OcrTranslatorPage} from "../pages/ocr-translator/ocr-translator";
import {RegTranslatorPage} from "../pages/reg-translator/reg-translator";
import { TranslatorProvider } from '../providers/translator/translator';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {ImgTranslatorPage} from "../pages/img-translator/img-translator";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireModule} from "angularfire2";
import {FIREBASE_CONFIG} from "./app.firebase.config";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {Camera} from "@ionic-native/camera";
import {Cordova} from "@ionic-native/core";
import {File} from "@ionic-native/file";
import {TextToSpeech} from "@ionic-native/text-to-speech";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OcrTranslatorPage,
    RegTranslatorPage,
    ImgTranslatorPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OcrTranslatorPage,
    RegTranslatorPage,
    ImgTranslatorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TranslatorProvider,
    HttpClientModule,
    HttpClient,
    Camera,
    TextToSpeech,
    File
  ]
})
export class AppModule {}
