import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxsModule } from '@ngxs/store';
import { AppStateStore, TdnSiteConfigState } from './shared/store/config-tdn.state';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ComponentsModule } from "./components/components.module";
import { ParamSectionComponent } from './components/param-section/param-section.component';
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { NgScrollbarModule } from "ngx-scrollbar";


@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,
    DragDropModule,
    ScrollingModule,
    NgScrollbarModule,
    NgxsModule.forRoot([TdnSiteConfigState, AppStateStore]),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    ComponentsModule],
  declarations: [AppComponent],
  exports: [
    ParamSectionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
