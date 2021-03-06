import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface Post {
  title: string;
  detail: string;
  skills: string;
  time: any;
  user: string;
  day: string;
}
export interface PostId extends Post {
  id: string;
}


@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  uid: string;

  private postCollection: AngularFirestoreCollection<Post>;
  posts: Observable<PostId[]>;
  delPost: AngularFirestoreCollection<Post>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    afAuth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          console.log('Granted');
        } else {
          ngZone.run(() => {
            router.navigate(['verify']);
          });
          console.log('DENIED');
        }
      }
    })
  }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.postCollection = this.afs.collection('posts', ref => {
          return ref.where('user', '==', user.uid);
        });
        this.posts = this.postCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Post;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
      } else {
        window.alert("Error");
      }
    });
  }

  deletePost(postId) {
    this.afs.collection('posts').doc(postId).delete().then(function() {
      console.log("DELETED SUCCESSFULLY!");
    })
    console.log(postId);
  }

  showTitle() {
    let t = document.getElementById("edit-title");
    if (t.style.display === "none") {
      t.style.display = "block";
    } else {
      t.style.display = "none";
    }
  }

  updateTitle(postid, title) {
    const postRef: AngularFirestoreDocument<any> = this.afs.collection(`posts`).doc(postid);
    const postData = {
      title: title
    }
    postRef.set(postData , {merge: true} );
  }
  updateDetail(postid, details) {
    const postRef: AngularFirestoreDocument<any> = this.afs.collection(`posts`).doc(postid);
    const postData = {
      detail: details
    }
    postRef.set(postData , {merge: true} );
  }
  updateSkills(postid, skills) {
    const postRef: AngularFirestoreDocument<any> = this.afs.collection(`posts`).doc(postid);
    const postData = {
      skills: skills
    }
    postRef.set(postData , {merge: true} );
  }

}
