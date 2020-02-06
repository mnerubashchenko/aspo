import { Component, enableProdMode, ViewChild, Inject } from '@angular/core';
import { BrandService, IBrands } from './BrandService';
import CustomStore from "devextreme/data/custom_store";
import { DxDataGridComponent } from 'devextreme-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-table-brands',
    templateUrl: './table-brands.component.html',
    styleUrls: ['./table-brands.component.css']
})
export class TableBrandsComponent {
    public brands: IBrands[];
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
    store: any;
    headers: HttpHeaders;
    constructor(private brandService: BrandService, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        sessionStorage.setItem("locale", 'ru');
        this.brandService.subject.subscribe(this.brandReceived);
        this.brandService.getBrands();
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.store = new CustomStore({
          key: "idBrand",
          load: () => this.brands,
            insert: (values) => this.http.post<any>(this.baseUrl + 'Brands/CreateBrand', JSON.stringify(values as IBrands), { headers: this.headers }).subscribe(
                () => { this.brandService.getBrands();}),
          //update: (key, values) => {
          //  console.log(key,values);
          //},
          //remove: (key) => {
          //  console.log(key);
          //}
        });
    }


    brandReceived = (data: IBrands[]) => {
        this.brands = data;
        this.dataGrid.instance.refresh();
    }

    ngOnInit() {

    }

}
