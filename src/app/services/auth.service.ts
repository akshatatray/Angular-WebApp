import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
  ) { }

  async createId(name, email, password1, password2) {
    if (password1==password2) {
      await this.auth.createUserWithEmailAndPassword(email, password1)
      await firebase.auth().currentUser.updateProfile({
        displayName: name
      });
      this.auth.onAuthStateChanged((user) => {
        user.sendEmailVerification();
        console.log('sent to',user.email);
      })
    } else {
      window.alert("Passwords didn't match.");
    }
  }

  async emailLogin(email, password) {
    await this.auth.signInWithEmailAndPassword(email, password);
    await this.auth.onAuthStateChanged((user) => {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      }
      return userRef.set(userData, {
        merge: true
      });
    });
  }
  googleLogin() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['home']);
      })
    }).catch((error) => {
      window.alert(error)
    });
  }
  facebookLogin() {
    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['home']);
      })
    }).catch((error) => {
      window.alert(error)
    });
  }
  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }
}
