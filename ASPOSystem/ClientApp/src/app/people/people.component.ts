import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
    people: string[] = ["Пользователи", "Роли", "Должности"];
    tablename: string;

    constructor() { }

    public selectedTable(data) {
        this.tablename = data.selectedItem;
    }

  ngOnInit() {
  }

}
