import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  name: string;
  email: string;
  photoUrl: string;
  skills: string;
  college: string;
  year: number;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit() {
  }

  setUserData( skills, college, year ) {
    this.afAuth.onAuthStateChanged((user) => {
      if(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          skills: skills,
          college: college,
          year: year
        }
        userRef.set(userData, {
          merge: true
        }).then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['profile']);
          });
        }).catch((error) => {
          window.alert(error.message);
        });
      } else {
        window.alert('Error!');
      }
    })
  }

}
