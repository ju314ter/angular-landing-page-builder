import { NgModule } from '@angular/core';
import { SectionListComponent } from "./sections/SectionListComponent/section-list.component";
import { HeaderSectionComponent } from "./sections/HeaderSectionComponent/header-section.component";
import { FooterSectionComponent } from "./sections/FooterSectionComponent/footer-section.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { SectionComponent } from "./sections/Section/section.component";
import { TDNPreviewerComponent } from "./Tdnpreviewer/tdnpreviewer.component";
import { ParamSectionComponent } from "./param-section/param-section.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ContenteditableModule } from "@ng-stack/contenteditable";
import { ParamHeaderFooterComponent } from "./param-header-footer/param-header-footer.component";
import { NgScrollbarModule } from "ngx-scrollbar";

@NgModule({
  declarations: [
    SectionComponent,
    SectionListComponent,
    HeaderSectionComponent,
    FooterSectionComponent,
    TDNPreviewerComponent,
    ParamSectionComponent,
    ParamHeaderFooterComponent,
  ],
  exports: [
    SectionComponent,
    SectionListComponent,
    HeaderSectionComponent,
    FooterSectionComponent,
    TDNPreviewerComponent,
    ParamSectionComponent,
    ParamHeaderFooterComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    DragDropModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatSlideToggleModule,
    ContenteditableModule,
    NgScrollbarModule,
  ],

})
export class ComponentsModule {
}
