import { Component, Inject, OnInit } from '@angular/core';
import { ITypeinter, TypeinterService } from './TypeinterService';

@Component({
  selector: 'app-table-type-inter',
    templateUrl: './table-type-inter.component.html',
    styleUrls: ['./table-type-inter.component.css']
})
export class TableTypeInterComponent {
    public typesinter: ITypeinter[];
    constructor(private typeInterService: TypeinterService) {
        this.typeInterService.subject.subscribe(this.typesinterReceived);
  }

    typesinterReceived = (data: ITypeinter[]) => {
        this.typesinter = data;
  }

  ngOnInit() {
      this.typeInterService.getTypeinter();
  }

}
