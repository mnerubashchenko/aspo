import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { ICategory, CategoryService } from './CategoryService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-table-view',
    templateUrl: './table-view.component.html',
    styleUrls: ['./table-view.component.css']
})
export class TableViewComponent {
  public categories: ICategory[];
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  store: any;
  headers: HttpHeaders;
  constructor(private categoryService: CategoryService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
      sessionStorage.setItem("locale", 'ru');
    this.categoryService.subject.subscribe(this.categoriesReceived);
    this.categoryService.getCategories();
    this.baseUrl = baseUrl;
    this.headers = new HttpHeaders().set('content-type', 'application/json');
    this.store = new CustomStore({
      key: "idCategory",
      load: () => this.categories,
      insert: (values) => this.http.post<any>(this.baseUrl + 'Category/CreateCategory', JSON.stringify(values as ICategory), { headers: this.headers }).subscribe(
        () => { this.categoryService.getCategories(); }),
      //update: (key, values) => {
      //  console.log(key,values);
      //},
      //remove: (key) => {
      //  console.log(key);
      //}
    });
  }

    categoriesReceived = (data: ICategory[]) => {
      this.categories = data;
      this.dataGrid.instance.refresh();
  }

  ngOnInit() {
 
  }

}
