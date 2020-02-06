import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BrandService {
    brands: IBrands[];
    subject = new Subject<IBrands[]>();
    headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getBrands() {
    this.http.get<any>(this.baseUrl + 'Brands/GetBrand').subscribe(result => {
        this.brands = result as IBrands[];
        this.subject.next(this.brands);
    }, error => console.error(error));
    }

    createBrand(brand: IBrands) {
      return this.http.post<any>(this.baseUrl + 'Brands/CreateBrand', JSON.stringify(brand),{ headers: this.headers });
    }
}

export interface IBrands {
  IdBrand: string;
  NameBrand: string;
}
