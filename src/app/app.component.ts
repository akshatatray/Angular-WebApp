import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos/dist/aos.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Angular Firebase';

  ngOnInit() {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
  }
}
