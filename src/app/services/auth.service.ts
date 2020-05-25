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
    public ngZone: NgZone
  ) { }

  createId(email, password1, password2) {
    if (password1==password2) {
      this.auth.createUserWithEmailAndPassword(email, password1);
    } else {
      window.alert("Passwords didn't match.");
    }
  }

  emailLogin(email, password) {
    this.auth.signInWithEmailAndPassword(email, password);
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
        }
        userRef.set(userData, {
          merge: true
        }).then((result) => {
          this.ngZone.run(() => {
            if (user.emailVerified) {
            this.router.navigate(['home']);
          } else {
            this.router.navigate(['login'])
          }
          });
        }).catch((error) => {
          window.alert(error.message);
        });
      }
    })
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
