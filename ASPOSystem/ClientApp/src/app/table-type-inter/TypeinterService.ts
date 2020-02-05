import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TypeinterService {
    typesinter: ITypeinter[];
  subject = new Subject<ITypeinter[]>();
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {

  }

  getTypeinter() {
      this.http.get<any>(this.baseUrl + 'api/Typeinter/GetTypeinter').subscribe(result => {
        this.typesinter = result as ITypeinter[];
        this.subject.next(this.typesinter);
    }, error => console.error(error));
  }
}

export interface ITypeinter {
  IdTypeinter: string;
  NameTypeinter: string;
}
