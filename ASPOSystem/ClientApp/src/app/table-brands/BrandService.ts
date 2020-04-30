import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BrandService {
    brands: IBrands[];
    subject = new Subject<IBrands[]>();
    headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getBrands(correction: string) {
    this.http.get<any>(this.baseUrl + 'Brands/GetBrand', {
      params: new HttpParams().set("correction", correction)
    }).subscribe(result => {
        this.brands = result as IBrands[];
        this.subject.next(this.brands);
    }, error => console.error(error));
    }

}

export interface IBrands {
  Id: string;
  NameBrand: string;
}
