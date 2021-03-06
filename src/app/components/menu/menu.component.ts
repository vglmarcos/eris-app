import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public changeText = false;
  public changeTextR = false;

  constructor(public router: Router) { }

  ngOnInit(): void {

  }

  isActive(routes: string[]) {
    let active: boolean = false;
    routes.forEach(route => {
      if(this.router.url === route) {
        active = true;
      }
    });

    return({
      'active-page': active
    })
  }
}
