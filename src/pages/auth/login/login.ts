import { AuthProvider } from './../../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;

  backgrounds = [
    'assets/imgs/background/background-1.jpeg',
    'assets/imgs/background/background-2.jpg'
  ];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    public loading: LoadingController) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToSignup() {
    this.navCtrl.push('SignupPage');
  }

  facebookLogin() {
    let loading = this.loading.create({
      content: 'Realizando login com Facebook'
    });

    loading.present();

    this.authProvider.facebookLogin().then(() => {
      loading.dismiss();
      alert('Login Realizado');
    }, error => {
      loading.dismiss();
      alert(JSON.stringify(error));
    });
  }
}
