import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TypedevService {
    typesdev: ITypedev[];
    subject = new Subject<ITypedev[]>();
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {

  }

  getTypedev() {
      this.http.get<any>(this.baseUrl + 'api/Typedev/GetTypedev').subscribe(result => {
        this.typesdev = result as ITypedev[];
        this.subject.next(this.typesdev);
    }, error => console.error(error));
  }
}

export interface ITypedev {
  IdTypedev: string;
  NameTypedev: string;
}
