import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  change() {
    const drop = document.getElementById('drop').innerHTML;
    if (drop == 'arrow_drop_down') {
      document.getElementById('drop').innerHTML = 'arrow_drop_up';
    }
    else if (drop == 'arrow_drop_up') {
      document.getElementById('drop').innerHTML = 'arrow_drop_down';
    }
  }

}