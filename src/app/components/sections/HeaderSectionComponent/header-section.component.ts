import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { TdnSiteConfigModel } from "../../../shared/models/tdn-site-config.model";
import { SafeUrl } from "@angular/platform-browser";
import HeaderConfigModel from "../../../shared/models/header-config.model";

@Component({
    selector: "headerSection",
    templateUrl: './header-section.component.html',
    styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent implements OnInit{

    private header: HeaderConfigModel;
    hoverConnection: boolean;
    hoverInscription: boolean;

    constructor(private store: Store){
    }

    ngOnInit(): void {
        this.store.select(state => state.TdnSiteConfigStateStore.header).subscribe(res => this.header = res)
    }
}
