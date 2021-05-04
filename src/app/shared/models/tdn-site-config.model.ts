import { SafeUrl } from "@angular/platform-browser";
import { SectionModel } from "./section.model";
import HeaderConfigModel from "./header-config.model";
import FooterConfigModel from "./footer-config.model";

export class TdnSiteConfigModel {
  brandName : string;
  customerCareNumber : number;
  customerEmail : string;
  customerAddress : string;
  sections : SectionModel[];
  sectionsOrder: string[];
  features : string[];
  header : HeaderConfigModel;
  footer : FooterConfigModel
}
