import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngxs/store";
import HeaderConfigModel from "../../shared/models/header-config.model";
import FooterConfigModel from "../../shared/models/footer-config.model";
import { EditHeaderAction } from "../../shared/store/config-tdn.action";

@Component({
  selector: 'app-param-header-footer',
  templateUrl: './param-header-footer.component.html',
  styleUrls: ['./param-header-footer.component.css']
})
export class ParamHeaderFooterComponent implements OnInit {

  private formHeader : FormGroup;
  private formFooter : FormGroup;
  private currentHeader: HeaderConfigModel;
  private updatedHeader : HeaderConfigModel;
  private currentFooter: FooterConfigModel;
  private updatedFooter : FooterConfigModel;

  constructor(private _fb: FormBuilder, private store: Store) {

  }
  ngOnInit(): void {

    this.store.select(state => state.TdnSiteConfigStateStore.header).subscribe((res:HeaderConfigModel) => {
      this.currentHeader = res;
    })
    this.store.select(state => state.AppStateStore.footer).subscribe((res:FooterConfigModel) => {
      this.currentFooter = res;
    })

    this.formHeader = new FormGroup({

      headerFlexDirectionProperty : new FormControl(this.currentHeader.flexDirectionProperty),
      headerBackgroundColorProperty : new FormControl(this.currentHeader.backgroundColorProperty),

      headerLogoImage : new FormControl(this.currentHeader.logoImage),
      logoLeftOffset : new FormControl(this.currentHeader.logoLeftOffset),

      buttonsPosProperty : new FormControl(this.currentHeader.buttonsPosProperty),
      buttonColorProperty : new FormControl(this.currentHeader.buttonColorProperty),
      buttonBackgroundColorProperty : new FormControl(this.currentHeader.buttonBackgroundColorProperty),
      buttonHoverColorProperty : new FormControl(this.currentHeader.buttonHoverColorProperty),
      buttonMargins: new FormControl(this.currentHeader.buttonMargins.replace("px",""))
    })

    this.formFooter = new FormGroup({

    })
  }

  saveHeader(){
      this.updatedHeader = new HeaderConfigModel();

      this.updatedHeader.flexDirectionProperty = this.formHeader.value.headerFlexDirectionProperty;
      this.updatedHeader.backgroundColorProperty = this.formHeader.value.headerBackgroundColorProperty;
      this.updatedHeader.logoImage = this.formHeader.value.headerLogoImage;
      this.updatedHeader.logoLeftOffset = this.formHeader.value.logoLeftOffset + "vw";
      this.updatedHeader.buttonsPosProperty = this.formHeader.value.buttonsPosProperty;
      this.updatedHeader.buttonColorProperty = this.formHeader.value.buttonColorProperty;
      this.updatedHeader.buttonBackgroundColorProperty = this.formHeader.value.buttonBackgroundColorProperty;
      this.updatedHeader.buttonHoverColorProperty = this.formHeader.value.buttonHoverColorProperty;
      this.updatedHeader.buttonMargins = this.formHeader.value.buttonMargins + "px";

      this.store.dispatch(new EditHeaderAction(this.updatedHeader))
  }
  saveFooter(){

  }

  onLogoSelected(files: FileList) {
      if (files.length === 0)
        return;

      let mimeType = files[0].type;
      if (mimeType.match(/.jpg|.jpeg|.svg|.png/) == null) {
        return;
      }

      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.formHeader.patchValue({
          headerLogoImage: <string>reader.result
        });
        this.saveHeader();
    }

  }

  changeButtonsPos(value: any) {
    if(value){
      this.currentHeader.buttonsPosProperty = value;
      this.saveHeader()
    }
  }
}
