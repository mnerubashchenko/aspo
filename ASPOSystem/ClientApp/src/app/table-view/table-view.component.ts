import { Component, Inject, OnInit } from '@angular/core';
import { ICategory, CategoryService } from './CategoryService';

@Component({
  selector: 'app-table-view',
    templateUrl: './table-view.component.html',
    styleUrls: ['./table-view.component.css']
})
export class TableViewComponent {
    public categories: ICategory[];
    constructor(private categoryService: CategoryService) {
        this.categoryService.subject.subscribe(this.categoriesReceived);
  }

    categoriesReceived = (data: ICategory[]) => {
        this.categories = data;
  }

  ngOnInit() {
      this.categoryService.getCategories();
  }

}
