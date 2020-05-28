import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


export interface User {
  displayName: string;
  email: string;
  photoURL: string;
  college: string;
  skills: string;
  year: string;
}


@Component({
  selector: 'app-contact-user',
  templateUrl: './contact-user.component.html',
  styleUrls: ['./contact-user.component.css']
})
export class ContactUserComponent implements OnInit {

  user$: Observable<User>;
  id: String;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => this.id = params.id)
  }

  ngOnInit() {
    this.user$ = this.afs.doc<User>('users/' + this.id).valueChanges();
  }

}
