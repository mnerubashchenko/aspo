import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'app';

  constructor() { }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("login");
  }

}
