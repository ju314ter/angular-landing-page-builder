import { Action, State, StateContext, Store } from '@ngxs/store';

import { TdnSiteConfigModel } from '../models/tdn-site-config.model';
import {
  AddSectionAction,
  EditSectionAction,
  EmptyTdnStore,
  UpdateSectionOrderAction,
  UpdateStoreWithSelectedSectionAction,
  UpdateStoreWithSelectedArraysAction,
  UpdateStoreWithStep1FormAction, AddFeaturesAction, EditHeaderAction, EditFooterAction, EditTextAction
} from "./config-tdn.action";
import { SectionModel } from "../models/section.model";
import { patch, updateItem } from "@ngxs/store/operators";
import FooterConfigModel from "../models/footer-config.model";
import HeaderConfigModel from "../models/header-config.model";
import SectionText from "../models/text.model";

@State<TdnSiteConfigModel>({
  name: 'TdnSiteConfigStateStore',
  defaults: {
    brandName: "",
    customerAddress: "",
    customerCareNumber: null,
    customerEmail: "",
    sections: [],
    features: [],
    sectionsOrder: [],
    header: new HeaderConfigModel(),
    footer: new FooterConfigModel(),
  }
})
export class TdnSiteConfigState {

  @Action(EmptyTdnStore)
  emptyTdnStore(ctx: StateContext<TdnSiteConfigModel>, action: EmptyTdnStore) {
    const state = ctx.getState()
    ctx.patchState({
      sections : [],
      features: [],
    })
  }
  @Action(UpdateStoreWithStep1FormAction)
  updateWithStep1Form({ patchState}: StateContext<TdnSiteConfigModel>, action: UpdateStoreWithStep1FormAction) {
    patchState(action.payload.formValues);
  }
  @Action(UpdateSectionOrderAction)
  updateSectionOrder(ctx: StateContext<TdnSiteConfigModel>, action: UpdateSectionOrderAction) {

    const state= ctx.getState();
    ctx.patchState({
      sectionsOrder: action.sectionOrder
    })
  }
  @Action(AddSectionAction)
  addSection(ctx: StateContext<TdnSiteConfigModel>, payload: AddSectionAction) {

    const state= ctx.getState();
    ctx.patchState({
        sections: [...state.sections, payload.section]
    })
  }
  @Action(AddFeaturesAction)
  addFeaturesArray(ctx: StateContext<TdnSiteConfigModel>, action: AddFeaturesAction) {

    const state= ctx.getState();
    ctx.patchState({
        features: action.featuresArray,
    })
  }
  @Action(EditSectionAction)
  editSection(ctx: StateContext<TdnSiteConfigModel>, payload: EditSectionAction) {

    const state= ctx.getState();

    ctx.setState(
      patch({
        sections: updateItem<SectionModel>(item => item.sectionName === payload.section.sectionName, payload.section)
      })
    )

  }
  @Action(EditTextAction)
  editText(ctx: StateContext<TdnSiteConfigModel>, payload: EditTextAction) {

    const sectionName = payload.sectionName
    const textContent = payload.textContent

    const state= ctx.getState();

    switch(payload.text){
      case "title" :
        ctx.setState(
          patch({
            sections: updateItem<SectionModel>(item => item.sectionName === sectionName,
              patch({
                titleText: patch({textContent: textContent})
              })
            )
          })
        )
        break;
      case "description" :
        ctx.setState(
          patch({
            sections: updateItem<SectionModel>(item => item.sectionName === sectionName,
              patch({
                descriptionText: patch({textContent: textContent})
              })
            )
          })
        )
        break;
      case "button" :
        ctx.setState(
          patch({
            sections: updateItem<SectionModel>(item => item.sectionName === sectionName,
              patch({
                buttonContent: textContent,
              })
            )
          })
        )
        break;
    }
  }
  @Action(EditHeaderAction)
  editHeader(ctx: StateContext<TdnSiteConfigModel>, payload: EditHeaderAction) {

    const state= ctx.getState();

    ctx.patchState({
      header: payload.headerConfig,
    })

  }
  @Action(EditFooterAction)
  editFooter(ctx: StateContext<TdnSiteConfigModel>, payload: EditFooterAction) {

    const state= ctx.getState();

    ctx.patchState({
      footer: payload.footerConfig,
    })

  }
}

export interface AppStateModel {
  selectedSection: string;
  selectedSectionArray: string[];
  selectedFeatureArray: string[];
}
@State<AppStateModel>({
  name: 'AppStateStore',
  defaults: {
    selectedSection: "Top",
    selectedSectionArray : [],
    selectedFeatureArray : [],
  }
})
export class AppStateStore {
  constructor(private store : Store){

  }
  @Action(UpdateStoreWithSelectedSectionAction)
  updateSelectedSection(ctx: StateContext<AppStateModel>, action: UpdateStoreWithSelectedSectionAction) {
    const state = ctx.getState()
    ctx.patchState({
      selectedSection : action.selectedSection,
    });
  }
  @Action(UpdateStoreWithSelectedArraysAction)
  updateStoreWithSelectedArrays(ctx: StateContext<AppStateModel>, action: UpdateStoreWithSelectedArraysAction) {
    const state = ctx.getState()
    ctx.patchState({
      selectedSectionArray : action.selectedSectionArray,
      selectedFeatureArray : action.selectedFeatureArray,
    });
    this.store.dispatch(new AddFeaturesAction(action.selectedFeatureArray))
  }
}
