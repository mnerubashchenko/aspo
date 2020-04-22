import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DxDataGridModule, DxSelectBoxModule, DxTextBoxModule  } from 'devextreme-angular';
import { TableBrandsComponent } from './table-brands/table-brands.component';
import { TablePostsComponent } from './table-posts/table-posts.component';
import { TableRolesComponent } from './table-roles/table-roles.component';
import { TableTypeDevComponent } from './table-type-dev/table-type-dev.component';
import { TableTypeInterComponent } from './table-type-inter/table-type-inter.component';
import { TableTypeMeasureComponent } from './table-type-measure/table-type-measure.component';
import { TableProgrammCommandsComponent } from './table-programm-commands/table-programm-commands.component';
import { TableTelemetryComponent } from './table-telemetry/table-telemetry.component';
import { HandbooksComponent } from './handbooks/handbooks.component';
import { PostService } from './table-posts/PostService';
import { BrandService } from './table-brands/BrandService';
import { PrCommandsService } from './table-programm-commands/PrCommandsService';
import { RoleService } from './table-roles/RoleService';
import { TelemetryService } from './table-telemetry/TelemetryService';
import { TypedevService } from './table-type-dev/TypedevService';
import { TypeinterService } from './table-type-inter/TypeinterService';
import { TypemeasureService } from './table-type-measure/TypemeasureService';
import { UsersService } from './table-users/UsersService';
import { ProjectService } from './table-projects/ProjectService';
import { InterfaceService } from './table-interfaces/InterfaceService';
import { DevicesService } from './table-devices/DevicesService';
import { MeasureService } from './table-measures/MeasureService';
import { ProjectMeasureService } from './table-project-measure/ProjectMeasureService';
import { locale, loadMessages } from 'devextreme/localization';
import { TableUsersComponent } from './table-users/table-users.component';
import { PeopleComponent } from './people/people.component';
import { MainInformationComponent } from './main-information/main-information.component';
import { TableProjectsComponent } from './table-projects/table-projects.component';
import { TableInterfacesComponent } from './table-interfaces/table-interfaces.component';
import { TableDevicesComponent } from './table-devices/table-devices.component';
import { TableMeasuresComponent } from './table-measures/table-measures.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth-guard.service';
import { RegistrationComponent } from './registration/registration.component';
import { AccountComponent } from './account/account.component';
import { PasswordChangerComponent } from './password-changer/password-changer.component';
import { TableProjectMeasureComponent } from './table-project-measure/table-project-measure.component';
import { TableProjectDeviceComponent } from './table-project-device/table-project-device.component';
import { ProjectDeviceService } from './table-project-device/ProjectDeviceService';
import { TableProjectInterfaceComponent } from './table-project-interface/table-project-interface.component';
import { ProjectInterfaceService } from './table-project-interface/ProjectInterfaceService';
import { TableProjectTelemetryComponent } from './table-project-telemetry/table-project-telemetry.component';
import { ProjectTelemetryService } from './table-project-telemetry/ProjectTelemetryService';
import { TableProjectCommandComponent } from './table-project-command/table-project-command.component';
import { ProjectCommandService } from './table-project-command/ProjectCommandService';
import { JsonMakerComponent } from './json-maker/json-maker.component';

declare var require: any;
let messagesDe = require("devextreme/localization/messages/de.json"),
  messagesJa = require("devextreme/localization/messages/ja.json"),
  messagesRu = require("devextreme/localization/messages/ru.json");

loadMessages(messagesRu);
loadMessages(messagesDe);
loadMessages(messagesJa);

locale(navigator.language);

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TableBrandsComponent,
    TablePostsComponent,
    TableRolesComponent,
    TableTypeDevComponent,
    TableTypeInterComponent,
    TableTypeMeasureComponent,
    TableProgrammCommandsComponent,
    TableTelemetryComponent,
    HandbooksComponent,
    TableUsersComponent,
    PeopleComponent,
    MainInformationComponent,
    TableProjectsComponent,
    TableInterfacesComponent,
    TableDevicesComponent,
    TableMeasuresComponent,
    LoginComponent,
    RegistrationComponent,
    AccountComponent,
    PasswordChangerComponent,
    TableProjectMeasureComponent,
    TableProjectDeviceComponent,
    TableProjectInterfaceComponent,
    TableProjectTelemetryComponent,
    TableProjectCommandComponent,
    JsonMakerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
      FormsModule,
      DxDataGridModule,
      DxSelectBoxModule,
      DxTextBoxModule,
    RouterModule.forRoot([
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'table-brands', component: TableBrandsComponent, canActivate: [AuthGuard] },
    { path: 'table-posts', component: TablePostsComponent },
    { path: 'table-roles', component: TableRolesComponent },
    { path: 'table-type-dev', component: TableTypeDevComponent },
    { path: 'table-type-inter', component: TableTypeInterComponent },
    { path: 'table-type-measure', component: TableTypeMeasureComponent },
    { path: 'table-telemetry', component: TableTelemetryComponent },
    { path: 'table-programm-commands', component: TableProgrammCommandsComponent },
    { path: 'handbooks', component: HandbooksComponent },
    { path: 'people', component: PeopleComponent },
    { path: 'main-information', component: MainInformationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'account', component: AccountComponent },
    { path: 'password-changer', component: PasswordChangerComponent }
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5001"],
        blacklistedRoutes: []
      }
    })
  ],
    providers: [PostService,
        BrandService,
        PrCommandsService,
        RoleService,
        TelemetryService,
        TypedevService,
        TypeinterService,
        TypemeasureService,
        UsersService,
        ProjectService,
        InterfaceService,
        DevicesService,
        MeasureService,
        AuthGuard,
        ProjectMeasureService,
        ProjectDeviceService,
        ProjectInterfaceService,
        ProjectTelemetryService,
        ProjectCommandService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
