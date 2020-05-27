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

  day(n:number) {
    if (n==0) {
      return 'Monday';
    } else if (n==1) {
      return 'Tuesday';
    } else if (n==2) {
      return 'Wednesday';
    } else if (n==3) {
      return 'Thursday';
    } else if (n==4) {
      return 'Friday';
    } else if (n==5) {
      return 'Saturday';
    } else if (n==6) {
      return 'Sunday';
    }
  }

  postJob(title, detail, skills) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        const d = new Date();
        const n = d.getDay();
        const uid = user.uid;
        const postRef: AngularFirestoreCollection<any> = this.afs.collection(`posts`);
        const postData = {
          title: title,
          detail: detail,
          skills: skills,
          time: firebase.firestore.Timestamp.fromDate(new Date()),
          day: this.day(n),
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
