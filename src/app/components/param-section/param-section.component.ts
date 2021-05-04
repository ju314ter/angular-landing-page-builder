import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, Sanitizer, ViewChild } from '@angular/core';
import { Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { SectionModel } from "../../shared/models/section.model";
import { EditSectionAction } from "../../shared/store/config-tdn.action";

@Component({
  selector: 'app-param-section',
  templateUrl: './param-section.component.html',
  styleUrls: ['./param-section.component.css']
})
export class ParamSectionComponent implements OnInit {

  form : FormGroup;
  private sectionName: string;
  private currentSection : SectionModel;
  private updateSection: SectionModel;

  private isStyleVerified = false;

  private titleContent: string;
  private descriptionContent: string;
  private CTAContent: string;

  constructor(private store: Store, private sanitizer: DomSanitizer, private _fb: FormBuilder, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {

    this.currentSection = new SectionModel();

    this.store.select(state => state.AppStateStore.selectedSection).subscribe((res:string) => {
      this.sectionName = res;
      this.store
        .select(state => state.TdnSiteConfigStateStore.sections)
        .subscribe((res: SectionModel[]) => {
          //On enregistre la nouvelle valeur dans la currentSection
          if(res){
            const section = res.find(s => s.sectionName == this.sectionName);

            if (section) {
              this.currentSection = section;
            }

          }

          //On update le formulaire avec les nouvelles valeurs
          this.form = new FormGroup({
            //General
            flexDirection : new FormControl(this.currentSection.flexDirectionProperty, { updateOn : 'blur' }),
            sectionHeight : new FormControl(this.currentSection.sectionHeightProperty.replace("vh","")),
            sectionTopMarginProperty : new FormControl(this.currentSection.sectionTopMarginProperty.replace("px","")),
            sectionBottomMarginProperty : new FormControl(this.currentSection.sectionBottomMarginProperty.replace("px","")),
            //Background
            backgroundColor : new FormControl(this.currentSection.backgroundColorProperty),
            sectionBackgroundImage : new FormControl(this.currentSection.sectionBackgroundImage),
            backgroundPosProperty : new FormControl(this.currentSection.backgroundPosProperty),
            backgroundSizeProperty : new FormControl(this.currentSection.backgroundSizeProperty),
            //Illustration
            illustrationSize : new FormControl(this.currentSection.illustrationSizeProperty.replace("%","")),
            sectionIllustrationImage: new FormControl(this.currentSection.sectionIllustrationImage),
            isIllustrationDisplayed: new FormControl(this.currentSection.illustrationDisplay),
            //Call to action button
            CTAPos: new FormControl(this.currentSection.CTAPosProperty),
            CTAColor : new FormControl(this.currentSection.CTAColorProperty),
            CTABackgroundColor : new FormControl(this.currentSection.CTABackgroundColorProperty),
            CTALetterSpacing : new FormControl(this.currentSection.CTALetterSpacingProperty.replace("px","")),
            isButtonDisplayed : new FormControl(this.currentSection.CTAButtonDisplay),
            buttonTransformProperty : new FormControl(this.currentSection.buttonTransformProperty),
            CTAHoverColorProperty : new FormControl(this.currentSection.CTAHoverColorProperty),
            CTAFontProperty : new FormControl(this.currentSection.CTAFontProperty),
            buttonRadiusProperty : new FormControl(this.currentSection.buttonRadiusProperty),
            CTAWidth : new FormControl(this.currentSection.CTAWidth.replace("%","")),
            CTAHeight : new FormControl(this.currentSection.CTAHeight),
            //Title
            titleFontProperty : new FormControl(this.currentSection.titleText.fontProperty),
            titleFontSizeProperty : new FormControl(this.currentSection.titleText.fontSizeProperty),
            titlePosProperty : new FormControl(this.currentSection.titleText.posProperty),
            titleLetterSpacing : new FormControl(this.currentSection.titleText.letterSpacingProperty.replace("px","")),
            titleColorProperty : new FormControl(this.currentSection.titleText.colProperty),
            titleWeightProperty : new FormControl(this.currentSection.titleText.fontWeightProperty),
            isTitleDisplayed : new FormControl(this.currentSection.titleText.textDisplayed),
            titleTransformProperty : new FormControl(this.currentSection.titleText.transformProperty),
            titleWidthProperty : new FormControl(this.currentSection.titleText.widthProperty.replace("%","")),
            titleAlignProperty : new FormControl(this.currentSection.titleText.alignProperty),
            //Description
            descriptionFontProperty : new FormControl(this.currentSection.descriptionText.fontProperty),
            descriptionFontSizeProperty : new FormControl(this.currentSection.descriptionText.fontSizeProperty),
            descriptionPosProperty : new FormControl(this.currentSection.descriptionText.posProperty),
            descriptionLetterSpacing : new FormControl(this.currentSection.descriptionText.letterSpacingProperty.replace("px","")),
            descriptionColorProperty : new FormControl(this.currentSection.descriptionText.colProperty),
            descriptionWeightProperty : new FormControl(this.currentSection.descriptionText.fontWeightProperty),
            isDescriptionDisplayed : new FormControl(this.currentSection.descriptionText.textDisplayed),
            descriptionTransformProperty : new FormControl(this.currentSection.descriptionText.transformProperty),
            descriptionWidthProperty : new FormControl(this.currentSection.descriptionText.widthProperty.replace("%","")),
            descriptionAlignProperty : new FormControl(this.currentSection.descriptionText.alignProperty)
          })
        })
    })

  }

  checkStyleRendering(){
    this.isStyleVerified = true;
    this.save()
  }

  save() {
    this.updateSection = new SectionModel();

    //General
    this.updateSection.sectionName = this.sectionName;
    this.updateSection.flexDirectionProperty = this.form.value.flexDirection;
    this.updateSection.sectionHeightProperty = this.form.value.sectionHeight + "vh";
    this.updateSection.sectionTopMarginProperty = this.form.value.sectionTopMarginProperty + "px";
    this.updateSection.sectionBottomMarginProperty = this.form.value.sectionBottomMarginProperty + "px";

    //Background
    this.updateSection.backgroundColorProperty = this.form.value.backgroundColor;
    this.updateSection.sectionBackgroundImage = this.form.value.sectionBackgroundImage;
    this.updateSection.backgroundSizeProperty = this.form.value.backgroundSizeProperty;

    //Illustration
    this.updateSection.illustrationSizeProperty = this.form.value.illustrationSize + "\%";
    this.updateSection.sectionIllustrationImage = this.form.value.sectionIllustrationImage;
    this.updateSection.illustrationDisplay = this.form.value.isIllustrationDisplayed;

    //Titre
    this.updateSection.titleText.fontProperty = this.form.value.titleFontProperty;
    this.updateSection.titleText.fontSizeProperty = this.form.value.titleFontSizeProperty;
    this.updateSection.titleText.posProperty = this.form.value.titlePosProperty;
    this.updateSection.titleText.letterSpacingProperty = this.form.value.titleLetterSpacing;
    this.updateSection.titleText.colProperty = this.form.value.titleColorProperty;
    this.updateSection.titleText.fontWeightProperty = this.form.value.titleWeightProperty;
    this.updateSection.titleText.textDisplayed = this.form.value.isTitleDisplayed;
    this.updateSection.titleText.transformProperty = this.form.value.titleTransformProperty;
    this.updateSection.titleText.widthProperty = this.form.value.titleWidthProperty + "%";
    this.updateSection.titleText.alignProperty = this.form.value.titleAlignProperty;

    this.updateSection.titleText.textContent = this.titleContent;

    //Description
    this.updateSection.descriptionText.fontProperty = this.form.value.descriptionFontProperty;
    this.updateSection.descriptionText.fontSizeProperty = this.form.value.descriptionFontSizeProperty;
    this.updateSection.descriptionText.posProperty = this.form.value.descriptionPosProperty;
    this.updateSection.descriptionText.letterSpacingProperty = this.form.value.descriptionLetterSpacing;
    this.updateSection.descriptionText.colProperty = this.form.value.descriptionColorProperty;
    this.updateSection.descriptionText.fontWeightProperty = this.form.value.descriptionWeightProperty;
    this.updateSection.descriptionText.textDisplayed = this.form.value.isDescriptionDisplayed;
    this.updateSection.descriptionText.transformProperty = this.form.value.descriptionTransformProperty;
    this.updateSection.descriptionText.widthProperty = this.form.value.descriptionWidthProperty + "%";
    this.updateSection.descriptionText.alignProperty = this.form.value.descriptionAlignProperty;

    this.updateSection.descriptionText.textContent = this.descriptionContent;

    //Call to action Button
    this.updateSection.CTAPosProperty = this.form.value.CTAPos;
    this.updateSection.CTAColorProperty = this.form.value.CTAColor;
    this.updateSection.CTABackgroundColorProperty = this.form.value.CTABackgroundColor;
    this.updateSection.CTAHoverColorProperty = this.form.value.CTAHoverColorProperty;
    this.updateSection.CTALetterSpacingProperty = this.form.value.CTALetterSpacing;
    this.updateSection.CTAButtonDisplay = this.form.value.isButtonDisplayed;
    this.updateSection.buttonTransformProperty = this.form.value.buttonTransformProperty;
    this.updateSection.CTAHoverColorProperty = this.form.value.CTAHoverColorProperty;
    this.updateSection.CTAFontProperty = this.form.value.CTAFontProperty;
    this.updateSection.buttonRadiusProperty = this.form.value.buttonRadiusProperty + "%";
    this.updateSection.CTAWidth = this.form.value.CTAWidth + "%";
    this.updateSection.CTAHeight = this.form.value.CTAHeight;

    this.updateSection.CTAContent = this.CTAContent;

    this.store.dispatch(new EditSectionAction(this.updateSection))
  }

  exportConfigJson(){
    this.store.select(state => state.TdnSiteConfigStateStore).subscribe((tdnStore)=> {

      const element = document.createElement('a') as HTMLElement;
      const fileName = 'configTDN.json';
      const fileType = fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
      element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(JSON.stringify(tdnStore))}`);
      element.setAttribute('download', fileName);

      let event = new MouseEvent("click");
      element.dispatchEvent(event);

    })
  }

  changeBackgroundPos(value: any): void {
    this.currentSection.backgroundPosProperty = value
  }
  changeBackgroundSize(value: any): void {
    if (!value) {
      return null;
    } else {
      this.currentSection.backgroundSizeProperty = value
    }
  }

  changeIllustrationSize(value: number | null) {
    if (!value) {
      return 0;
    } else {
      this.currentSection.illustrationSizeProperty = " " + value + "%";
      return value;
    }
  }

  changeSectionHeight(value: number) {
    if (!value) {
      return 0;
    } else {
      this.currentSection.sectionHeightProperty = " " + value + "vh";
      return value;
    }
  }
  changeSectionTopMargin(value: number) {
    if (!value) {
      return 0;
    } else {
      this.currentSection.sectionTopMarginProperty = " " + value + "px";
      return value;
    }
  }
  changeSectionBottomMargin(value: number) {
    if (!value) {
      return 0;
    } else {
      this.currentSection.sectionBottomMarginProperty = " " + value + "px";
      return value;
    }
  }
  changeSectionButtonLetterSpacing(value: number){
    if (!value) {
      return 0;
    } else {
      this.currentSection.CTALetterSpacingProperty = " " + value + "px";
      return value;
    }
  }
  changeSectionTextLetterSpacing(value: number){
    if (!value) {
      return 0;
    } else {
      this.currentSection.descriptionText.letterSpacingProperty = " " + value + "px";
      return value;
    }
  }
  changeSectionTitleLetterSpacing(value: number){
    if (!value) {
      return 0;
    } else {
      this.currentSection.titleText.letterSpacingProperty = " " + value + "px";
      return value;
    }
  }
  changeDescriptionWidth(value: number) {
    if (!value) {
      return 0;
    } else {
      this.currentSection.descriptionText.widthProperty = " " + value + "%";
      return value;
    }
  }
  changeTitleWidth(value: number) {
    if (!value) {
      return 0;
    } else {
      this.currentSection.titleText.widthProperty = " " + value + "%";
      return value;
    }
  }
  changeDescriptionAlign(value: any) {
    this.currentSection.descriptionText.alignProperty = value
  }

  changeTitleAlign(value: any) {
    this.currentSection.titleText.alignProperty = value
  }
  changeTextPos(value: any): void {
    this.currentSection.descriptionText.posProperty = value
  }
  changeTitlePos(value: any): void {
    this.currentSection.titleText.posProperty = value
  }
  changeCTAPos(value: any): void {
    this.currentSection.CTAPosProperty = value
  }

  //onBackground et onIllustration => meme fonction, seule la référence a leur formControl respectif change. Comment factoriser ?
  onBackgroundSelected(files) {
    if (files.length === 0)
      return;

    let mimeType = files[0].type;
    if (mimeType.match(/.jpg|.jpeg|.svg|.png/) == null) {
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.form.patchValue({
        sectionBackgroundImage: <string>reader.result
        //TODO : selectedBackground: this.sanitizer.bypassSecurityTrustUrl(<string>reader.result)
      });
      this.save();
    }

    this.cd.markForCheck();// need to run CD since file load runs outside of zone => Pas compris pourquoi et à quoi ça sert (service ChangeDetector)
  }

  onIllustrationSelected(files) {
    if (files.length === 0)
      return;

    let mimeType = files[0].type;
    if (mimeType.match(/.jpg|.jpeg|.svg|.png/) == null) {
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.form.patchValue({
        sectionIllustrationImage: this.sanitizer.bypassSecurityTrustUrl(<string>reader.result)
      });
      this.save();
    }
    this.cd.markForCheck();
  }


}
