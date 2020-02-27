import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-information',
  templateUrl: './main-information.component.html',
  styleUrls: ['./main-information.component.css']
})
export class MainInformationComponent implements OnInit {

    maininfo: string[] = ["Проекты", "Протоколы", "Проекты-Протоколы", "Интерфейсы", "Устройства", "Измерения", "Устройства-Измерения", "Протоколы-Измерения", "Протоколы-Телеметрия", "Протоколы-Программные команды", "Комментарии к протоколам"];
    tablename: string;

    constructor() { }

    public selectedTable(data) {
        this.tablename = data.selectedItem;
    }

  ngOnInit() {
  }

}
