import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  PROVIDER_FACEBOOK = "FACEBOOK";
  userProfile: any;
  fireAuth: any;

  constructor(public platform: Platform,
    public fb: Facebook,
    public angularFireAuth: AngularFireAuth,
    public angularFireDatabase: AngularFireDatabase) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');    
  }

  signupUser(usuario): any {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha).then((newUser) => {
      return this.angularFireAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.senha).then((authenticatedUser) => {
        let uid = authenticatedUser.user.uid;
        let userObject = {
          uid: uid,
          registeredDate: Date.now(),
          name: usuario.nome + " " + usuario.sobrenome,
          email: usuario.email,
          photoUrl: ""
        };

        newUser.user.updateProfile({
          displayName: usuario.nome + " " + usuario.sobrenome,
          photoURL: ""
        });

        return this.angularFireDatabase.list('userProfile').update(uid, userObject).then(() => true,
          error => {
            throw new Error(error.message);
          }
        )
      }, error => {
        throw new Error(error.message);
      })
    }, error => {
      throw new Error(error.message);
    });
  }

  login(usuario) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.senha);
  }

  facebookLogin() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential).then(data => {
          this.socialLoginSuccess(data);
        });
      }).catch((error) => console.log(error))
    } else {
      return this.angularFireAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => this.socialLoginSuccess(res))
        .catch((erro) => console.log(erro))
    }
  }

  socialLoginSuccess(firebaseData) {
    return this.getUserByUid(firebaseData.user.uid).then(user => {
      let uid = firebaseData.user.uid;
      if (!user) {
        let { email, first_name, last_name } = firebaseData.additionalUserInfo.profile;
        let { photoURL } = firebaseData.user;

        let userObject = {
          uid: uid,
          registeredDate: Date.now(),
          nome: first_name,
          sobrenome: last_name,
          email: email,
          socialPhotoUrl: photoURL,
        };

        return this.angularFireDatabase.list('userProfile').update(uid, userObject).then(() => true);
      } else {
        let userObject = { facebookVerified: true };
        return this.angularFireDatabase.list('userProfile').update(uid, userObject).then(() => true);
      }
    }, error => {
      console.log('social login firebase error', error)
    });
  }

  getUserByUid(uid) {
    return new Promise((resolve, reject) => {
      var userRef = this.userProfile.child(uid);
      userRef.once("value", function (snap) {
        var user = snap.val();
        resolve(user);
      }, function (error) {
        reject(error);
      });
    });
  }

  getCurrentUser() {
    return this.fireAuth;
  }

}
