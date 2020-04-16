import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class InterfaceService {
    interfaces: IInterface[];
    subject = new Subject<IInterface[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getInterfaces() {
    this.http.get<any>(this.baseUrl + 'Interface/GetInterfaces').subscribe(result => {
        this.interfaces = result as IInterface[];
        this.subject.next(this.interfaces);
    }, error => console.error(error));
  }
}

export interface IInterface {
  Id: string;
  NameInterface: string;
  IsReadyStatusInterface: string;
  IsUsedInterface: string;
  SelectedPortInterface: string;
  TypeInterface: string;
  IpInputInterface: string;
  ActualIpInterface: string;
}
