import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public auth: AuthService,
  ) {
    afAuth.onAuthStateChanged((user) => {
      if (user) {
        afs.collection('users').doc(user.uid).ref.get().then((doc) => {
          if (doc.exists) {
            this.userData = doc.data();
            console.log(doc.data());
          } else {
            console.log("No Such Document");
          }
        }).catch((error) => {
          console.log(error);
        })
      } else {
        console.log("Error.");
      }
    })
  }

  ngOnInit() {
    
  }

}
