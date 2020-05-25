import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit() {
  }

  postJob(title, detail, skills) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const postRef: AngularFirestoreCollection<any> = this.afs.collection(`posts`);
        const postData = {
          title: title,
          detail: detail,
          skills: skills,
          time: firebase.firestore.Timestamp.fromDate(new Date()),
          user: uid
        }
        console.log(uid);
        postRef.add(postData).then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['home']);
          });
        }).catch((error) => {
          window.alert(error.message);
        });
      } else {
        window.alert("ERROR!");
      }
    })
  }

}
