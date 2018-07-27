import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Facebook } from '@ionic-native/facebook';

export const firebaseConfig = {
  apiKey: "AIzaSyCwU50l6qTALC6PA7-tI3SU1cmUNHU6bkY",
  authDomain: "guia-cidades-ef9f3.firebaseapp.com",
  databaseURL: "https://guia-cidades-ef9f3.firebaseio.com",
  projectId: "guia-cidades-ef9f3",
  storageBucket: "guia-cidades-ef9f3.appspot.com",
  messagingSenderId: "980492578919"
}
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    AngularFireDatabase,
    Facebook
  ]
})
export class AppModule { }
