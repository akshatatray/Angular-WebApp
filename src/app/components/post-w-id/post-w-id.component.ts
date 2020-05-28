import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export interface Post {
  title: string;
  detail: string;
  skills: string;
  day: string;
  time: any;
  user: string;
}

@Component({
  selector: 'app-post-w-id',
  templateUrl: './post-w-id.component.html',
  styleUrls: ['./post-w-id.component.css']
})
export class PostWIdComponent implements OnInit {

  post$: Observable<Post>;
  id: String;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params.id)
  }

  ngOnInit(): void {
    this.post$ = this.afs.doc<Post>('posts/' + this.id).valueChanges();
  }

}
