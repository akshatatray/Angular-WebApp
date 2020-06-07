import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public fireauth: AngularFireAuth,
  ) {
    fireauth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          console.log('Granted');
        } else {
          ngZone.run(() => {
            router.navigate(['verify']);
          });
          console.log('DENIED')
        }
      }
    })
  }

  ngOnInit() {
  }

}
