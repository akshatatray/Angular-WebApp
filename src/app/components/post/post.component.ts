import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
        const postRef: AngularFirestoreDocument<any> = this.afs.doc(`posts/${user.uid}`);
        const postData = {
          title: title,
          detail: detail,
          skills: skills
        }
        postRef.set(postData, {
          merge: true
        }).then((result) => {
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
