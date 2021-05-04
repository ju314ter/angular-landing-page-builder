import { SafeUrl } from "@angular/platform-browser";
import SectionText from "./text.model";

export class SectionModel {

  //Général
  sectionName : string = "DefaultName";
  flexDirectionProperty : string = "row-reverse";
  sectionHeightProperty: string = "50vh";
  sectionTopMarginProperty : string = "0px";
  sectionBottomMarginProperty : string = "0px";

  //Title
  titleText : SectionText = new SectionText();

  //Description
  descriptionText : SectionText = new SectionText();

  //Call To Action Button
  CTAButtonDisplay: boolean = true;
  CTAPosProperty: string = "center";
  CTAColorProperty: string = "#000";
  CTABackgroundColorProperty: string  = "#fff";
  CTALetterSpacingProperty : string = "1px";
  buttonTransformProperty : string = "none";
  buttonRadiusProperty : string;
  CTAHoverColorProperty : string;
  CTAFontProperty : string;
  CTAWidth : string = "50%";
  CTAHeight : number = 2;
  CTAContent: string;
  buttonContent : string;

  //Background
  sectionBackgroundImage: string | ArrayBuffer | SafeUrl;
  backgroundPosProperty : string;
  backgroundColorProperty: string = "#ffffff";

  backgroundSizeProperty : string;
  //Illustration
  illustrationDisplay : boolean = true;
  illustrationSizeProperty: string = "50%";
  sectionIllustrationImage: string | SafeUrl = "https://img.pngio.com/directors-and-officers-liability-for-failure-to-obtain-an-import-imported-png-693_693.jpg";
}
