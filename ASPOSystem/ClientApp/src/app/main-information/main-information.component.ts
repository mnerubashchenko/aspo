import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-information',
  templateUrl: './main-information.component.html',
  styleUrls: ['./main-information.component.css']
})
export class MainInformationComponent implements OnInit {

    maininfo: string[] = ["Проекты", "Комментарии к проектам", "Интерфейсы", "Устройства", "Измерения"];
    tablename: string;

    constructor() { }

    public selectedTable(data) {
        this.tablename = data.selectedItem;
    }

  ngOnInit() {
  }

}
