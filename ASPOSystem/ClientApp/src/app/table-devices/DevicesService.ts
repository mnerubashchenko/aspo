import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DevicesService {
    devices: IDevice[];
    subject = new Subject<IDevice[]>();
  headers: HttpHeaders;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  getDevices() {
    this.http.get<any>(this.baseUrl + 'Devices/GetDevices').subscribe(result => {
        this.devices = result as IDevice[];
        this.subject.next(this.devices);
    }, error => console.error(error));
  }
}

export interface IDevice {
  IdDevice: string;
  InterfaceDevice: string;
  BrandDevice: string;
  ModelDevice: string;
  StatusDevice: string;
  IpInputDevice: string;
  ActualIpDevice: string;
  TypeDevice: string;
  CaptionDevice: string;

}