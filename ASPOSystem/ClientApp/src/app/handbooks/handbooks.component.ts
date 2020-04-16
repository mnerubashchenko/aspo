import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-handbooks',
  templateUrl: './handbooks.component.html',
  styleUrls: ['./handbooks.component.css']
})
export class HandbooksComponent implements OnInit {

    handbooks: string[] = ["Бренды устройств", "Программные команды", "Телеметрии", "Типы интерфейсов", "Типы устройств", "Типы измерений"];
    tablename: string;

    constructor() { }

    public selectedTable(data) {
        this.tablename = data.selectedItem;
    }

  ngOnInit() {
  }

}
