import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  backgrounds = [
    'assets/imgs/background/background-1.jpeg',
    'assets/imgs/background/background-2.jpg'
  ];

  constructor(public navCtrl: NavController) {

  }

  details() {
    this.navCtrl.push('CategoriaPage');
  }
}
