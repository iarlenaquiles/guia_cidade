import { SplashScreen } from '@ionic-native/splash-screen';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage{
    tab1Root = 'HomePage';
    tab2Root = 'MapaPage';
    tab3Root = 'UserSettingsPage';

    constructor(public splashScreen: SplashScreen){
        this.splashScreen.hide();
    }
}