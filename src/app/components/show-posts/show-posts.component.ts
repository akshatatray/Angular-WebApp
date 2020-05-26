import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  selector: 'app-show-posts',
  templateUrl: './show-posts.component.html',
  styleUrls: ['./show-posts.component.css']
})
export class ShowPostsComponent {

  private postCollection: AngularFirestoreCollection<Post>;
  posts: Observable<PostId[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.postCollection = afs.collection<Post>('posts', ref => {
      return ref.orderBy('time','desc');
    });
    this.posts = this.postCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}