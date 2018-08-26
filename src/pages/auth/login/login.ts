import { AuthProvider } from './../../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
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
    public loading: LoadingController,
    public alert: AlertController) {
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

  login() {
    let loading = this.loading.create({
      content: 'Realizando login'
    });

    loading.present();

    this.authProvider.login(this.loginForm.value).then(
      () => {
        loading.dismiss();
        this.navCtrl.setRoot('HomePage');
      },
      (erro) => {
        loading.dismiss();
        const alert = this.alert.create({
          title: 'Ops...',
          subTitle: 'Usuário ou senha estão inválidos',
          buttons: ['OK']
        });

        alert.present();
      }
    )
  }

  facebookLogin() {
    let loading = this.loading.create({
      content: 'Realizando login com Facebook'
    });

    loading.present();

    this.authProvider.facebookLogin().then(() => {
      loading.dismiss();
      this.navCtrl.setRoot('HomePage');
    }, error => {
      loading.dismiss();
    });
  }
}
