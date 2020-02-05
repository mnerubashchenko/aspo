import { Component, Inject, OnInit } from '@angular/core';
import { ITypemeasure, TypemeasureService } from './TypemeasureService';

@Component({
  selector: 'app-table-type-measure',
    templateUrl: './table-type-measure.component.html',
    styleUrls: ['./table-type-measure.component.css']
})
export class TableTypeMeasureComponent {
    public typesmeasure: ITypemeasure[];
    constructor(private typeMeasureService: TypemeasureService) {
        this.typeMeasureService.subject.subscribe(this.typesmeasureReceived);
  }

    typesmeasureReceived = (data: ITypemeasure[]) => {
        this.typesmeasure = data;
  }

  ngOnInit() {
      this.typeMeasureService.getTypemeasure();
  }

}
