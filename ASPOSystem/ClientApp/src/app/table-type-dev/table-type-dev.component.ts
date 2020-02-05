import { Component, Inject, OnInit } from '@angular/core';
import { ITypedev, TypedevService } from './TypedevService';

@Component({
  selector: 'app-table-type-dev',
    templateUrl: './table-type-dev.component.html',
    styleUrls: ['./table-type-dev.component.css']
})
export class TableTypeDevComponent {
    public typesdev: ITypedev[];
    constructor(private typedevService: TypedevService) {
        this.typedevService.subject.subscribe(this.typesdevReceived);
  }

    typesdevReceived = (data: ITypedev[]) => {
        this.typesdev = data;
  }

  ngOnInit() {
      this.typedevService.getTypedev();
  }

}
