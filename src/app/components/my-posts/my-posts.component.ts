import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Post } from '../../post.model';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  uid: string;

  private postCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {}

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.postCollection = this.afs.collection('posts', ref => {
          console.log(user.uid);
          return ref.where('user', '==', user.uid);
        });
        this.posts = this.postCollection.valueChanges();
      } else {
        window.alert("Error");
      }
    });

  }

}
