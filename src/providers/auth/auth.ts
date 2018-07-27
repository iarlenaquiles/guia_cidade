import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthProvider {

  constructor(public angularFireAuth: AngularFireAuth, public angularFireDatabase: AngularFireDatabase) { }

  signupUser(usuario): any {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha).then((newUser) => {
      return this.angularFireAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.senha).then((authenticatedUser) => {
        let uid = authenticatedUser.user.uid;
        let userObject = {
          uid: uid,
          registeredDate: Date.now(),
          name: usuario.nome + ' ' + usuario.sobrenome,
          email: usuario.email,
          photoUrl: ''
        };

        newUser.user.updateProfile({
          displayName: usuario.nome + " " + usuario.sobrenome,
          photoURL: ""
        });

        return this.angularFireDatabase.list('userProfile').update(uid, userObject).then(() => true,
          error => {
            throw new Error(error.message);
          });
      }, error => {
        throw new Error(error.message);
      });
    }, error => {
      throw new Error(error.message);
    });
  }

}
