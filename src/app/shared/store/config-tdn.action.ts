import { FormStep1Interface } from "../models/interfaces/form-step-1.interface";
import { FormStep2Interface } from "../models/interfaces/form-step-2.interface";
import { SafeUrl } from "@angular/platform-browser";
import { SectionModel } from "../models/section.model";
import HeaderConfigModel from "../models/header-config.model";
import FooterConfigModel from "../models/footer-config.model";


//ConfigStore
export class EmptyTdnStore {
  static readonly  type = '[TdnSiteConfigStateStore] emptyTdnStore'
  constructor(){}
}
export class EditHeaderAction {
  static readonly type= '[TdnSiteConfigStateStore] editHeader'
  constructor(public headerConfig: HeaderConfigModel){}
}
export class EditFooterAction {
  static readonly type= '[TdnSiteConfigStateStore] editFooter'
  constructor(public footerConfig: FooterConfigModel){}
}
export class UpdateStoreWithStep1FormAction {
  //primary and secondary color, logo, ...
  static readonly type = '[TdnSiteConfigStateStore] updateWithStep1Form'

  constructor(public payload:   { formValues: FormStep1Interface } ) {}
}
export class UpdateSectionOrderAction {
  static readonly type = '[TdnSiteConfigStateStore] updateSectionOrder'

  constructor(public sectionOrder: string[]) {}
}
export class AddSectionAction {
  static readonly type= '[TdnSiteConfigStateStore] addSection'

  constructor(public section: SectionModel) {}
}
export class EditSectionAction {
  static readonly type='[TdnSiteConfigStateStore] editSection'

  constructor(public section: SectionModel) {
  }
}
export class EditTextAction {
  static readonly type='[TdnSiteConfigStateStore] editText'

  constructor(public textContent, public sectionName, public text ) {
  }
}

export class AddFeaturesAction {
  static readonly type='[TdnSiteConfigStateStore] addFeaturesArray'

  constructor(public featuresArray : string[]) {
  }
}

//AppStore
export class UpdateStoreWithSelectedSectionAction {
  static readonly type= '[AppStateStore] updateSelectedSection'

  constructor(public selectedSection: string) {}

}
export class UpdateStoreWithSelectedArraysAction {
  static readonly type= '[AppStateStore] updateStoreWithSelectedArrays'

  constructor(public selectedSectionArray: string[], public selectedFeatureArray: string[]) {}

}


