import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CategoryService {
    categories: ICategory[];
  subject = new Subject<ICategory[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getCategories() {
      this.http.get<any>(this.baseUrl + 'Category/GetCategory').subscribe(result => {
          this.categories = result as ICategory[];
          this.subject.next(this.categories);
    }, error => console.error(error));
  }

  createCategory(category: ICategory) {
    return this.http.post<any>(this.baseUrl + 'Category/CreateCategory', JSON.stringify(category), { headers: this.headers });
  }
}

export interface ICategory {
  IdCategory: string;
  NameCategory: string;
}
