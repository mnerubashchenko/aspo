import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-roles',
  templateUrl: './table-roles.component.html',
  styleUrls: ['./table-roles.component.css']
})
export class TableRolesComponent {
    public roles: IRoles[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<any>(baseUrl + 'api/Roles/GetRole').subscribe(result => {
        this.roles = result as IRoles[];
    }, error => console.error(error));
  }

  ngOnInit() {
  }

}

interface IRoles {
    IdRole: string;
    NameRole: string;
}
