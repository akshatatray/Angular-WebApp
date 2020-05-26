import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Post {
  title: string;
  detail: string;
  skills: string;
  time: any;
  user: string;
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
  ) {}

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

  showId(postId) {
    this.afs.collection('posts').doc(postId).delete().then(function() {
      console.log("DELETED SUCCESSFULLY!");
    })
    console.log(postId);
  }

}
