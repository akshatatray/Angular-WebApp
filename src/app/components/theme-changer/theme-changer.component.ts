import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-changer',
  templateUrl: './theme-changer.component.html',
  styleUrls: ['./theme-changer.component.css']
})
export class ThemeChangerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  theme() {
    const body = document.getElementsByTagName('body')[0];
    const dl = body.className;
    
    if (dl == 'light') {
      body.classList.replace('light' , 'dark');
    } else if (dl == 'dark') {
      body.classList.replace('dark' , 'light');
    }
  }

}
