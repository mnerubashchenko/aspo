import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { TableViewComponent } from './table-view/table-view.component';
import { DxDataGridModule } from 'devextreme-angular';
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
import { CategoryService } from './table-view/CategoryService';
import { UsersService } from './table-users/UsersService';
import { locale, loadMessages } from 'devextreme/localization';
import { TableUsersComponent } from './table-users/table-users.component';
import { PeopleComponent } from './people/people.component';
declare var require: any;
let messagesDe = require("devextreme/localization/messages/de.json"),
  messagesJa = require("devextreme/localization/messages/ja.json"),
  messagesRu = require("devextreme/localization/messages/ru.json");

loadMessages(messagesRu);
loadMessages(messagesDe);
loadMessages(messagesJa);

locale(navigator.language);



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TableViewComponent,
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
    PeopleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
      FormsModule,
      DxDataGridModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
        { path: 'fetch-data', component: FetchDataComponent },
        { path: 'table-brands', component: TableBrandsComponent },
        { path: 'table-posts', component: TablePostsComponent },
        { path: 'table-roles', component: TableRolesComponent },
        { path: 'table-type-dev', component: TableTypeDevComponent },
        { path: 'table-type-inter', component: TableTypeInterComponent },
        { path: 'table-type-measure', component: TableTypeMeasureComponent },
        { path: 'table-telemetry', component: TableTelemetryComponent },
        { path: 'table-programm-commands', component: TableProgrammCommandsComponent },
        { path: 'handbooks', component: HandbooksComponent },
        { path: 'people', component: PeopleComponent },
        { path: 'table-view', component: TableViewComponent }
    ])
  ],
    providers: [PostService,
        BrandService,
        PrCommandsService,
        RoleService,
        TelemetryService,
        TypedevService,
        TypeinterService,
        TypemeasureService,
        CategoryService,
        UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
