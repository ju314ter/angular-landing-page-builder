import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Store } from "@ngxs/store";
import {
  EmptyTdnStore,
  UpdateStoreWithSelectedArraysAction,
  UpdateStoreWithStep1FormAction
} from "./shared/store/config-tdn.action";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  firstStepValidated = false;
  secondStepValidated = false;

  featureArray = [
    {id: 1, name: 'nocommitment', text: 'Sans engagement'},
    {id: 2, name: 'interface', text: 'Interface intuitive'},
    {id: 3, name: 'limitless', text: 'Partout, tout le temps'},
    {id: 4, name: 'adfree', text: 'Aucune publicité'},
    {id: 5, name: 'devices', text: 'Sur tout vos écrans'},
    {id: 6, name: 'time', text: 'Accès illimité'},
    {id: 7, name: 'hd', text: 'Contenu HD'},
    {id: 8, name: 'addfiles', text: 'Nouveauté ajoutée régulièrement'}
  ];
  selectedFeatureArray: []

  sectionArray = [
    {id: 1, name: 'Top'},
    {id: 2, name: 'Films'},
    {id: 3, name: 'Sport'},
    {id: 4, name: 'Musique'},
    {id: 5, name: 'EBook'},
    {id: 6, name: 'Jeux'},
    {id: 7, name: 'Software'},
    {id: 8, name: 'Feature'}
  ];
  selectedSectionArray: [];

  pageLandingForm: FormGroup;

  brandForm = new FormGroup({
    primaryColor: new FormControl(''),
    secondaryColor: new FormControl(''),
    brandName: new FormControl(''),
    customerCareNumber: new FormControl(''),
    customerEmail: new FormControl(''),
    customerAddress: new FormControl(''),
    logo: new FormControl()
  })

  selectedLogo: SafeUrl;


  constructor(private store: Store, private sanitizer: DomSanitizer, private _fb: FormBuilder, private cd : ChangeDetectorRef) {
    this.pageLandingForm = this._fb.group({
      sectionArray: new FormArray([]),
      featureArray: new FormArray([]),
      headerPos: new FormControl(''),
      headerCol: new FormControl(''),
    })
    this.createSectionCheckboxes();
  }

  createSectionCheckboxes() {
    this.sectionArray.map((o, i) => {
      const section = new FormControl(true); //top Section validée par défaut
      (this.pageLandingForm.controls.sectionArray as FormArray).push(section);
    });
    this.featureArray.map((o, i) => {
      const feature = new FormControl(true);
      (this.pageLandingForm.controls.featureArray as FormArray).push(feature);
    });
  }

  step1() {

    Object.keys(this.brandForm.value).forEach(key => {

      //Pretraitement du formulaire puis validation
      this.firstStepValidated = true;
    })

    this.store.dispatch(new UpdateStoreWithStep1FormAction({formValues: this.brandForm.value}))
  }

  step2() {

    const selectedSection = this.pageLandingForm.value.sectionArray
      .map((v: boolean, i:number) => v ? this.sectionArray[i].name : null)
      .filter(v => v !== null);

    const selectedFeature = this.pageLandingForm.value.featureArray
      .map((v: boolean, i:number) => v ? this.featureArray[i] : null)
      .filter(v => v !== null);

    this.secondStepValidated = true;

    if (this.firstStepValidated && this.secondStepValidated) {
      this.selectedSectionArray = selectedSection;
      this.selectedFeatureArray = selectedFeature;

      this.store.dispatch(new UpdateStoreWithSelectedArraysAction(selectedSection, selectedFeature))
    }

  }

  onBacked(event) {
    this.firstStepValidated = false;
    this.secondStepValidated = false;
    this.store.dispatch(new EmptyTdnStore())
  }
}
