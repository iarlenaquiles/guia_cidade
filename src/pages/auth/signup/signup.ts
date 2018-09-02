import { AuthProvider } from './../../../providers/auth/auth';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  backgrounds = [
    'assets/imgs/background/background-1.jpeg',
    'assets/imgs/background/background-2.jpg'
  ];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alert: AlertController,
    public authProvider: AuthProvider,
    public loading: LoadingController) {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
      senhaConfirmacao: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    let { senha, senhaConfirmacao } = this.signupForm.controls;
    let senhaErrada = senha.value !== senhaConfirmacao.value;

    if (senhaErrada) {
      const alert = this.alert.create({
        title: 'Ops...',
        subTitle: 'Senhas nao conferem',
        buttons: ['OK']
      });

      alert.present();
    } else {
      let loading = this.loading.create({
        content: 'Criando usuário...'
      });

      loading.present();

      this.authProvider.signupUser(this.signupForm.value).then(() => {
        loading.dismiss();
        const alert = this.alert.create({
          title: 'Ebaaa!',
          subTitle: 'Usuário cadastrado com sucesso',
          buttons: ['OK']
        });

        alert.present();
      }, (error) => {
        console.log(error);
        loading.dismiss();
        const alert = this.alert.create({
          title: 'Oops!',
          subTitle: 'Usuário  não cadastrado, tente novamente',
          buttons: ['OK']
        });

        alert.present();
      });
    }
  }

}
