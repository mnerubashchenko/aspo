import { Component, enableProdMode, ViewChild, Inject, OnInit } from '@angular/core';
import { BrandService, IBrands } from './BrandService';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
    selector: 'app-table-brands',
    templateUrl: './table-brands.component.html',
    styleUrls: ['./table-brands.component.css']
})
export class TableBrandsComponent implements OnInit {
    public brands: IBrands[];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private brandService: BrandService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.brandService.subject.subscribe(this.brandReceived);
        this.brandService.getBrands();
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
          key: "id",
          load: () => this.brands,
          insert: (values) => this.http.post<any>(this.baseUrl + 'Brands/CreateBrand', JSON.stringify(values as IBrands), { headers: this.headers }).subscribe(
                () => { this.brandService.getBrands();}),
            update: (key, values) =>
              this.http.put<any>(this.baseUrl + 'Brands/UpdateBrand', JSON.stringify(values as IBrands), { headers: this.headers }).subscribe(
            () => { this.brandService.getBrands(); }),
            remove: (key) => this.http.delete<any>(this.baseUrl + 'Brands/DeleteBrand', { params: new HttpParams().set('id', key) }).subscribe(() => { this.brandService.getBrands(); })
        });
    }
    onRowUpdating(e) {
      for (var property in e.oldData) {
        if (!e.newData.hasOwnProperty(property)) {
          e.newData[property] = e.oldData[property];
        }
      }
    }


    brandReceived = (data: IBrands[]) => {
        this.brands = data;
        this.dataGrid.instance.refresh();
    }

  ngOnInit() {
    let token = localStorage.getItem("jwt");
  }

}
