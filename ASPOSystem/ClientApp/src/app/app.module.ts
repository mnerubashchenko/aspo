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
    HandbooksComponent
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
        { path: 'table-view', component: TableViewComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
