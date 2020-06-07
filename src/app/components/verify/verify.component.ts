import { Component, OnInit, NgZone  } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(
    public router: Router,
    public ngZone: NgZone,
    public fireauth: AngularFireAuth,
    ) {
      fireauth.onAuthStateChanged((user) => {
        if(user) {
          if(user.emailVerified) {
            ngZone.run(() => {
              router.navigate(['home']);
            })
          } else {
            console.log('DENIED');
          }
        }
      })
    }

  ngOnInit() {
  }

}
