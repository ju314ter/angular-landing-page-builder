import { Component, Input, OnInit } from "@angular/core";
import { moveItemInArray } from "@angular/cdk/drag-drop";
import { Store } from "@ngxs/store";
import {
    UpdateSectionOrderAction, UpdateStoreWithSelectedSectionAction,
} from "../../../shared/store/config-tdn.action";
import { filter } from "rxjs/operators";

@Component({
    selector: 'section-list',
    templateUrl: './section-list.component.html',
    styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

    sectionsList: [];

    constructor(private store: Store){

    }

    drop(event) {
        moveItemInArray(this.sectionsList, event.previousIndex, event.currentIndex)
        this.store.dispatch(new UpdateSectionOrderAction(event.container._changeDetectorRef.context.sectionsList))
    }

    ngOnInit(): void {
        // ordre de base
        this.store.select(state => state.AppStateStore.selectedSectionArray)
          .subscribe(res => {
              this.sectionsList = res;
          })
        this.store.dispatch(new UpdateSectionOrderAction(this.sectionsList))
    }

    editSection(sectionName: string) {
        this.store.dispatch(new UpdateStoreWithSelectedSectionAction(sectionName))
    }
}
