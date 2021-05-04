import { Component, Input, OnInit } from '@angular/core';
import { Store } from "@ngxs/store";
import { SectionModel } from "../../../shared/models/section.model";
import { AddSectionAction, EditTextAction } from "../../../shared/store/config-tdn.action";
import { map } from "rxjs/operators";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})

export class SectionComponent implements OnInit {

  @Input() sectionName: string;

  currentSection: SectionModel;
  titleText: string;
  descriptionText: string ;
  buttonText: string;

  isTop: boolean;
  hover: boolean;
  private form: any;

  constructor(private store: Store, private _fb: FormBuilder) {
    this.currentSection = new SectionModel();
  }

  ngOnInit() {

    this.store.select(state => state.TdnSiteConfigStateStore.sections)
      .pipe(
        map((sections: SectionModel[]) => sections.find(s => s.sectionName === this.sectionName))
      )
      .subscribe((res: SectionModel) => {

        if (res) {
          this.currentSection = res;
        }

      });

    switch (this.sectionName) {
      case "Top" :
        this.titleText = "Le service de divertissement tout-en-un.\n Accessible à tout moment, sur tous vos écrans.";
        this.descriptionText = "Accédez en illimité à tous vos contenus: films, musique, ebooks, jeux et logiciels.";
        this.buttonText = "Créez votre compte";
        this.isTop = true;
        break;
      case "Films" :
        this.titleText = "Film en illimités !";
        this.descriptionText = "Cliquez et regardez, c'est instantané ! Profitez d'un accès illimité à la totalité de notre catalogue streaming et en qualité HD. Des films les plus primés et récents aux grands classiques, vous trouverez tout ce que vous cherchez sur Fuuze.";
        this.buttonText = "Découvrir le catalogue";
        break;
      case "Sport" :
        this.titleText = "Le sport en illimité !";
        this.descriptionText = "Créez votre compte dès maintenant et suivez vos sports préférés en direct. Nous vous proposons les principales ligues nationales et internationales. Vous avez raté un match ? Revivez les meilleurs moments de ce match en vidéo.";
        this.buttonText = "Regarder maintenant !";
        break;
      case "Musique" :
        this.titleText = "Musique en illimités !";
        this.descriptionText = "Ecoutez la musique que vous aimez, où que vous soyez. Chez vous, dans les transports, ou au bureau, votre musique ne vous quittera plus! Retrouvez vos artistes préférés, revivez les concerts de vos groupes favoris et créez vos playlists !";
        this.buttonText = "Lancer l'écoute";
        break;
      case "EBook" :
        this.titleText = "Ebooks illimités !";
        this.descriptionText = "Accédez à des milliers d’ouvrages, et choisissez selon vos envies ! Redécouvrez les grands classiques de la littérature, apprenez-en plus sur les sujets qui vous passionnent, suivez vos héros dans leurs aventures… Il y en a pour tous les goûts !";
        this.buttonText = "Explorer notre bibliothèque";
        break;
      case "Jeux" :
        this.titleText = "Jeux illimités !";
        this.descriptionText = "Amusez-vous avec tous les jeux de notre collection. Fuuze vous propose une sélection de jeux d'arcade accessibles sur tous vos appareils, sans aucune installation requise ! Exercez votre cerveau avec nos jeux de réflexion, partez à l'aventure en défendant la planète contre une invasion d 'aliens ou détendez-vous avec des jeux plus légers!";
        this.buttonText = "Accéder à tous nos jeux";
        break;
      case "Software" :
        this.titleText = "Logiciels illimités !";
        this.descriptionText = "Téléchargez en un clic ! Nous avons sélectionné les meilleurs logiciels pour vous: retouchez vos photos, communiquez avec vos proches , apprenez une nouvelle langue, optimisez les performances de votre ordinateur... Nous avons tout ce qu'il vous faut ! Installez-en autant que vous voulez, ils sont à vous.";
        this.buttonText = "Découvrir tout nos logiciels";
        break;
      case "Feature" :
        this.titleText = "L'expérience Fuuze. Partout, à tous les instants.";
        this.descriptionText = "Ecoutez la musique que vous aimez, où que vous soyez. Chez vous, dans les transports, ou au bureau, votre musique ne vous quittera plus!\n" +
          "Retrouvez vos artistes préférés, revivez les concerts de vos groupes favoris et créez vos playlists !";
        this.buttonText = "C'est parti !";
        break;
    }

    this.form = new FormGroup({
      descriptionText : new FormControl(this.descriptionText),
      titleText: new FormControl(this.titleText),
      buttonText : new FormControl(this.buttonText)
    })

    const section = new SectionModel();
    section.sectionName = this.sectionName;
    this.store.dispatch(new AddSectionAction(section))
  }

  updateTextContent(element){
    console.log(this.form.value.titleText)
      switch(element){
        case "title" :
          if(this.form.value.titleText.length < 1) {
            this.ngOnInit();
            break;
          }
          this.store.dispatch(new EditTextAction(this.form.value.titleText , this.sectionName ,element))
          break;
        case "description" :
          if(this.form.value.descriptionText.length < 1) {
            this.ngOnInit();
            break;
          }
          this.store.dispatch(new EditTextAction(this.form.value.descriptionText , this.sectionName ,element))
          break;
        case "button" :
          if(this.form.value.buttonText.length < 1) {
            this.ngOnInit();
            break;
          }
          this.store.dispatch(new EditTextAction(this.form.value.buttonText , this.sectionName ,element))
          break;
      }
  }

}
