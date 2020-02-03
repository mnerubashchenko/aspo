import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-brands',
  templateUrl: './table-brands.component.html',
  styleUrls: ['./table-brands.component.css']
})
export class TableBrandsComponent {
    public brands: IBrands[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<any>(baseUrl + 'api/Brands/GetBrand').subscribe(result => {
        this.brands = result as IBrands[];
    }, error => console.error(error));
  }

  ngOnInit() {
  }
}

interface IBrands {
  IdBrand: string;
  NameBrand: string;
}
