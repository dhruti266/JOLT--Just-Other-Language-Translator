webpackJsonp([3],{

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranslatorProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_text_to_speech__ = __webpack_require__(357);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TranslatorProvider = (function () {
    function TranslatorProvider(http, tts) {
        this.http = http;
        this.tts = tts;
        this.apiUrl = {
            "url": "https://gateway.watsonplatform.net/language-translator/api/v2/translate",
            "username": "ed5bba02-edb2-4c90-8f5b-5a1bd260c194",
            "password": "kFS2HffgOmAh"
        };
        this.LanguageTranslatorV2 = __webpack_require__(636);
        this.languageTranslator = new this.LanguageTranslatorV2({
            username: 'ed5bba02-edb2-4c90-8f5b-5a1bd260c194',
            password: 'kFS2HffgOmAh',
            version: 'v2'
        });
        console.log('Hello TranslatorProvider Provider');
    }
    TranslatorProvider.prototype.getOCRData = function (imgURL) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("https://api.ocr.space/parse/imageurl?apikey=72f3d4030c88957&url=" + imgURL).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    TranslatorProvider.prototype.translate = function (parameters, result) {
        var val = {};
        this.languageTranslator.translate(parameters, function (error, response) {
            if (error)
                console.log(error);
            else {
                result.pop();
                result.push(response["translations"][0]["translation"]);
            }
        });
    };
    TranslatorProvider.prototype.speak = function (text) {
        var parameters = {
            text: text
        };
        this.tts.speak(parameters)
            .then(function () { return console.log('Success'); })
            .catch(function (reason) { return console.log(reason); });
    };
    TranslatorProvider.prototype.identifySource = function (text, source, result, target) {
        var self = this;
        var parameters = {
            text: text
        };
        this.languageTranslator.identify(parameters, function (error, response) {
            if (error) {
                console.log(error);
            }
            else {
                source = response["languages"][0]["language"];
                self.translate({ text: text, model_id: source + "-" + target }, result);
            }
        });
    };
    TranslatorProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_text_to_speech__["a" /* TextToSpeech */]])
    ], TranslatorProvider);
    return TranslatorProvider;
}());

//# sourceMappingURL=translator.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImgTranslatorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_translator_translator__ = __webpack_require__(130);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ImgTranslatorPage = (function () {
    function ImgTranslatorPage(navCtrl, navParams, afDatabase, camera, provider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afDatabase = afDatabase;
        this.camera = camera;
        this.provider = provider;
        this.imgURL = "https://firebasestorage.googleapis.com/v0/b/jolt-aef24.appspot.com/o/jolt?alt=media";
        this.languages = [];
        this.result = [];
        this.target = 'en';
        this.mypicref = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage().ref('/');
        this.Fbref = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage().ref('/');
        this.picData = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage().ref('/jolt').getDownloadURL()
            .then(function (url) {
            console.log("log1: " + url);
            return url;
        }).catch(function (res) {
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
    ImgTranslatorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ImgTranslatorPage');
    };
    ImgTranslatorPage.prototype.takePic = function () {
        var _this = this;
        this.camera.getPicture({
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.PNG,
            saveToPhotoAlbum: true
        }).then(function (imagedata) {
            _this.picdata = imagedata;
            _this.uploadPic();
        });
    };
    ImgTranslatorPage.prototype.uploadPic = function () {
        var _this = this;
        this.mypicref.child('jolt').putString(this.picdata, 'base64', { contentType: 'image/png' })
            .then(function (savepic) {
            _this.picData['i'] = savepic.downloadURL;
        });
    };
    ImgTranslatorPage.prototype.getMedia = function () {
        var _this = this;
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            mediaType: this.camera.MediaType.ALLMEDIA,
            destinationType: this.camera.DestinationType.FILE_URI
        }).then(function (fileuri) {
            window.resolveLocalFileSystemURL("file://" + fileuri, function (EF) {
                EF.file(function (file) {
                    var FR = new FileReader();
                    FR.onloadend = function (res) {
                        var AF = res.target.result;
                        var blob = new Blob([new Uint8Array(AF)], { type: 'image/png' });
                        _this.upload(blob);
                    };
                    FR.readAsArrayBuffer(file);
                    // this.translate();
                });
            });
        });
    };
    ImgTranslatorPage.prototype.translate = function () {
        var _this = this;
        this.provider.getOCRData(this.imgURL).then(function (data) {
            console.log(data);
            _this.text = data["ParsedResults"][0]["ParsedText"];
            _this.provider.identifySource(_this.text, _this.source, _this.result, _this.target);
            console.log("result: ");
            console.log(_this.result);
        });
    };
    ImgTranslatorPage.prototype.speak = function () {
        if (this.result[0] === undefined) {
            this.provider.speak('I Couldn\'t find any text! Current version only supports English and French translations.');
        }
        else {
            this.provider.speak(this.result[0]);
        }
    };
    ImgTranslatorPage.prototype.upload = function (blob) {
        var _this = this;
        this.Fbref.child('jolt').put(blob).then(function (savepic) {
            _this.picData['i'] = savepic.downloadURL;
            _this.translate();
        });
    };
    ImgTranslatorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-img-translator',template:/*ion-inline-start:"/Users/dhruti/Sem 5/Projects/DAVK/src/pages/img-translator/img-translator.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Image Translator</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-title text-center>\n    <div id="title">\n      Image Translator\n    </div>\n  </ion-title>\n  <hr>\n\n  <ion-card class="option" color="primary">\n    <ion-card-header text-center>\n      <p class="btnOption" ion-button text-uppercase>\n        To :\n        <ion-select [(ngModel)]="target">\n          <div *ngFor="let code of languages">\n            <ion-option [value]="code.short">{{code.full}}</ion-option>\n          </div>\n        </ion-select>\n      </p>\n    </ion-card-header>\n    <ion-card-content color="white" text-center>\n      <div text-center>\n        <button ion-button class="btnOption" round outline (click)="getMedia()">Upload an Image</button>\n      </div>\n      <div text-center>\n        <button ion-button class="btnOption" round outline (click)="takePic()">Click a Photo</button>\n      </div>\n    </ion-card-content>\n  </ion-card>\n  <div text-center>\n    <button ion-button id="speakBtn" (click)="speak()" text-center>\n      Speak\n    </button><br>\n  </div>\n\n  {{this.result[0]}}\n\n</ion-content>\n'/*ion-inline-end:"/Users/dhruti/Sem 5/Projects/DAVK/src/pages/img-translator/img-translator.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_5__providers_translator_translator__["a" /* TranslatorProvider */]])
    ], ImgTranslatorPage);
    return ImgTranslatorPage;
}());

//# sourceMappingURL=img-translator.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OcrTranslatorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_translator_translator__ = __webpack_require__(130);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the OcrTranslatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OcrTranslatorPage = (function () {
    function OcrTranslatorPage(navCtrl, navParams, provider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.provider = provider;
        this.languages = [];
        this.result = [];
        this.target = 'en';
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
    OcrTranslatorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OcrTranslatorPage');
    };
    OcrTranslatorPage.prototype.translate = function () {
        var _this = this;
        this.provider.getOCRData(this.imgURL).then(function (data) {
            console.log(data);
            _this.text = data["ParsedResults"][0]["ParsedText"];
            _this.provider.identifySource(_this.text, _this.source, _this.result, _this.target);
        });
    };
    OcrTranslatorPage.prototype.speak = function () {
        if (this.result[0] === undefined) {
            this.provider.speak('I Couldn\'t find any text! Current version only supports English and French translations.');
        }
        else {
            this.provider.speak(this.result[0]);
        }
    };
    OcrTranslatorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ocr-translator',template:/*ion-inline-start:"/Users/dhruti/Sem 5/Projects/DAVK/src/pages/ocr-translator/ocr-translator.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>OCR Translator</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-title text-center>\n    <div id="title">\n      OCR Translator\n    </div>\n  </ion-title>\n  <hr>\n\n  <ion-card class="option" color="primary">\n    <ion-card-header text-center>\n      <p class="btnOption" ion-button text-uppercase>\n        To :\n        <ion-select [(ngModel)]="target">\n          <div *ngFor="let code of languages">\n            <ion-option [value]="code.short">{{code.full}}</ion-option>\n          </div>\n        </ion-select>\n      </p>\n    </ion-card-header>\n    <ion-card-content color="white" text-center>\n      <p class="btnOption" ion-button text-uppercase>\n        <ion-label>Enter link of the image: </ion-label>\n      </p>\n      <ion-item>\n        <ion-input type="text" [(ngModel)]="imgURL"></ion-input>\n      </ion-item>\n    </ion-card-content>\n  </ion-card>\n\n  <!--<ion-item>-->\n    <!--<ion-label>To</ion-label>-->\n    <!--<ion-select [(ngModel)]="target" >-->\n      <!--<div *ngFor="let code of languages">-->\n        <!--<ion-option [value]="code.short">{{code.full}}</ion-option>-->\n      <!--</div>-->\n    <!--</ion-select>-->\n  <!--</ion-item>-->\n  <!--<ion-item>-->\n    <!--<ion-label>Enter link of the image: </ion-label>-->\n  <!--</ion-item>-->\n  <!--<ion-item>-->\n    <!--<ion-input type="text" [(ngModel)]="imgURL"></ion-input>-->\n  <!--</ion-item>-->\n\n\n\n  {{this.result[0]}}\n\n  <div  text-center>\n    <button ion-button (click)="translate()">\n      Translate\n    </button>\n    <button ion-button id="speakBtn" (click)="speak()">\n      Speak\n    </button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/dhruti/Sem 5/Projects/DAVK/src/pages/ocr-translator/ocr-translator.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_translator_translator__["a" /* TranslatorProvider */]])
    ], OcrTranslatorPage);
    return OcrTranslatorPage;
}());

//# sourceMappingURL=ocr-translator.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegTranslatorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_translator_translator__ = __webpack_require__(130);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RegTranslatorPage = (function () {
    function RegTranslatorPage(navCtrl, navParams, provider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.provider = provider;
        this.languages = [];
        this.source = "en";
        this.target = "fr";
        this.text = "Hello";
        this.result = [];
        this.parameters = {
            text: this.text,
            model_id: this.source + "-" + this.target
        };
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
    RegTranslatorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegTranslatorPage');
    };
    RegTranslatorPage.prototype.translate = function () {
        this.result = [];
        this.parameters = {
            text: this.text,
            model_id: this.source + "-" + this.target
        };
        console.log(this.parameters);
        this.provider.translate(this.parameters, this.result);
    };
    RegTranslatorPage.prototype.speak = function () {
        if (this.result[0] === undefined) {
            this.provider.speak('I Couldn\'t find any text! Current version only supports English and French translations.');
        }
        else {
            this.provider.speak(this.result[0]);
        }
    };
    RegTranslatorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-reg-translator',template:/*ion-inline-start:"/Users/dhruti/Sem 5/Projects/DAVK/src/pages/reg-translator/reg-translator.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Regular Translator</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-title text-center>\n    <div id="title">\n      Regular Translator\n    </div>\n  </ion-title>\n  <hr>\n  <ion-card class="option" color="primary">\n    <ion-card-header text-center>\n      <p class="btnOption" ion-button text-uppercase>\n        From :\n        <ion-select [(ngModel)]="source">\n          <div *ngFor="let code of languages">\n            <ion-option [value]="code.short">{{code.full}}</ion-option>\n          </div>\n        </ion-select>\n      </p>\n    </ion-card-header>\n    <ion-card-content color="white" text-center>\n      <ion-textarea [(ngModel)]="text">\n\n      </ion-textarea>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card class="option" color="primary">\n    <ion-card-header text-center>\n      <p class="btnOption" ion-button text-uppercase>\n        To :\n        <ion-select [(ngModel)]="target">\n          <div *ngFor="let code of languages">\n            <ion-option [value]="code.short">{{code.full}}</ion-option>\n          </div>\n        </ion-select>\n      </p>\n    </ion-card-header>\n    <ion-card-content color="white" text-center>\n      <ion-textarea [(ngModel)]="result[0]">\n\n      </ion-textarea>\n    </ion-card-content>\n  </ion-card>\n\n  <!--<ion-item>-->\n    <!--<ion-label>From</ion-label>-->\n    <!--<ion-select [(ngModel)]="source">-->\n      <!--<div *ngFor="let code of languages">-->\n        <!--<ion-option [value]="code.short">{{code.full}}</ion-option>-->\n      <!--</div>-->\n    <!--</ion-select>-->\n  <!--</ion-item>-->\n\n  <!--<ion-textarea [(ngModel)]="text">-->\n\n  <!--</ion-textarea>-->\n\n  <!--<ion-item>-->\n    <!--<ion-label>To</ion-label>-->\n    <!--<ion-select [(ngModel)]="target">-->\n      <!--<div *ngFor="let code of languages">-->\n        <!--<ion-option [value]="code.short">{{code.full}}</ion-option>-->\n      <!--</div>-->\n    <!--</ion-select>-->\n    <!--</ion-item>-->\n    <!--<ion-textarea [(ngModel)]="result[0]">-->\n\n    <!--</ion-textarea>-->\n\n    <div text-center>\n      <button ion-button id="translateBtn" (click)="translate()">\n        Translate\n      </button>\n      <button ion-button id="speakBtn" (click)="speak()">\n        Speak\n      </button>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/dhruti/Sem 5/Projects/DAVK/src/pages/reg-translator/reg-translator.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_translator_translator__["a" /* TranslatorProvider */]])
    ], RegTranslatorPage);
    return RegTranslatorPage;
}());

//# sourceMappingURL=reg-translator.js.map

/***/ }),

/***/ 250:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 250;

/***/ }),

/***/ 292:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/img-translator/img-translator.module": [
		871,
		2
	],
	"../pages/ocr-translator/ocr-translator.module": [
		872,
		1
	],
	"../pages/reg-translator/reg-translator.module": [
		873,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 292;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ocr_translator_ocr_translator__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reg_translator_reg_translator__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__img_translator_img_translator__ = __webpack_require__(235);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.ocrTranslator = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__ocr_translator_ocr_translator__["a" /* OcrTranslatorPage */]);
    };
    HomePage.prototype.regTranslator = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__reg_translator_reg_translator__["a" /* RegTranslatorPage */]);
    };
    HomePage.prototype.imgTranslator = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__img_translator_img_translator__["a" /* ImgTranslatorPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/dhruti/Sem 5/Projects/DAVK/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      JOLT\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding id="container">\n  <ion-title>\n    <div id="title" text-center>\n      <span class="jolt">J</span>ust <span class="jolt">O</span>ther <span class="jolt">L</span>anguage <span class="jolt">T</span>ranslator\n    </div>\n  </ion-title>\n  <hr>\n\n  <ion-card class="option" color="primary">\n    <ion-card-header text-center>\n      <button class="btnOption" ion-button (click)="regTranslator()" text-uppercase>\n        Regular Translator\n      </button>\n    </ion-card-header>\n    <ion-card-content color="white" text-center>\n      Regular Translator to translate from one language to other languages by typing some text.\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card class="option" color="primary">\n    <ion-card-header text-center>\n      <button class="btnOption" ion-button (click)="ocrTranslator()" text-uppercase>\n        OCR Translator\n      </button>\n    </ion-card-header>\n    <ion-card-content color="white" text-center>\n      OCR Translator to translate from one language to other languages by fetching the text from an image url.    </ion-card-content>\n  </ion-card>\n\n  <ion-card class="option" color="primary">\n    <ion-card-header text-center>\n      <button class="btnOption" ion-button (click)="imgTranslator()" text-uppercase>\n        Image Translator\n      </button>\n    </ion-card-header>\n    <ion-card-content color="white" text-center>\n      Image Translator to translate from one language to other languages by uploading an image containing text.    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/dhruti/Sem 5/Projects/DAVK/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(488);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(864);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_ocr_translator_ocr_translator__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_reg_translator_reg_translator__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_translator_translator__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common_http__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_img_translator_img_translator__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__ = __webpack_require__(865);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_firebase_config__ = __webpack_require__(869);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2_database__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_camera__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__ = __webpack_require__(870);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_text_to_speech__ = __webpack_require__(357);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_ocr_translator_ocr_translator__["a" /* OcrTranslatorPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_reg_translator_reg_translator__["a" /* RegTranslatorPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_img_translator_img_translator__["a" /* ImgTranslatorPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/img-translator/img-translator.module#ImgTranslatorPageModule', name: 'ImgTranslatorPage', segment: 'img-translator', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ocr-translator/ocr-translator.module#OcrTranslatorPageModule', name: 'OcrTranslatorPage', segment: 'ocr-translator', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reg-translator/reg-translator.module#RegTranslatorPageModule', name: 'RegTranslatorPage', segment: 'reg-translator', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_13_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_14__app_firebase_config__["a" /* FIREBASE_CONFIG */]),
                __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__["a" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_15_angularfire2_database__["b" /* AngularFireDatabaseModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_ocr_translator_ocr_translator__["a" /* OcrTranslatorPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_reg_translator_reg_translator__["a" /* RegTranslatorPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_img_translator_img_translator__["a" /* ImgTranslatorPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__providers_translator_translator__["a" /* TranslatorProvider */],
                __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["a" /* HttpClient */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_text_to_speech__["a" /* TextToSpeech */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__["a" /* File */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 639:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 641:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 686:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 687:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 755:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 864:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(466);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/dhruti/Sem 5/Projects/DAVK/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/dhruti/Sem 5/Projects/DAVK/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 869:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CONFIG; });
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyDuGpZi77I7fVTj-_GPUAP0KNG4I5pg5bY",
    authDomain: "jolt-aef24.firebaseapp.com",
    databaseURL: "https://jolt-aef24.firebaseio.com",
    projectId: "jolt-aef24",
    storageBucket: "jolt-aef24.appspot.com",
    messagingSenderId: "188295738410"
};
//# sourceMappingURL=app.firebase.config.js.map

/***/ })

},[468]);
//# sourceMappingURL=main.js.map