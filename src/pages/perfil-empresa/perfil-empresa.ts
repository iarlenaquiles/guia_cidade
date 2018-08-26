import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PerfilEmpresaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-empresa',
  templateUrl: 'perfil-empresa.html',
})
export class PerfilEmpresaPage {

  backgrounds = [
    'assets/imgs/background/background-1.jpeg',
    'assets/imgs/background/background-2.jpg'
  ];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilEmpresaPage');
  }

}
