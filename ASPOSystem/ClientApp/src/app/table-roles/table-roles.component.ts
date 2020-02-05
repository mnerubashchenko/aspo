import { Component, Inject, OnInit } from '@angular/core';
import { IRoles, RoleService } from './RoleService';

@Component({
  selector: 'app-table-roles',
  templateUrl: './table-roles.component.html',
  styleUrls: ['./table-roles.component.css']
})
export class TableRolesComponent {
    public roles: IRoles[];
    constructor(private roleService: RoleService) {
        this.roleService.subject.subscribe(this.rolesReceived);
    }

    rolesReceived = (data: IRoles[]) => {
        this.roles = data;
    }

    ngOnInit() {
        this.roleService.getRoles();
    }

}
