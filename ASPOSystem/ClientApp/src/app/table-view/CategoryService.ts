import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CategoryService {
    categories: ICategory[];
    subject = new Subject<ICategory[]>();
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string ) {

  }

  getCategories() {
      this.http.get<any>(this.baseUrl + 'api/Category/GetCategory').subscribe(result => {
          this.categories = result as ICategory[];
          this.subject.next(this.categories);
    }, error => console.error(error));
  }
}

export interface ICategory {
  IdCategory: string;
  NameCategory: string;
}
