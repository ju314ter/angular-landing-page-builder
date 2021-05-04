import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";

@Component({
    selector: "footerSection",
    templateUrl: './footer-section.component.html',
    styleUrls: ['./footer-section.component.css']
})
export class FooterSectionComponent implements OnInit {

    brandName : string;
    customerCareNumber : number;
    customerEmail : string;
    customerAdress: string;

    constructor(private store: Store){}

    ngOnInit(): void {
        this.store.select(state => state.TdnSiteConfigStateStore.brandName).subscribe(res => this.brandName = res)
        this.store.select(state => state.TdnSiteConfigStateStore.customerCareNumber).subscribe(res => this.customerCareNumber = res)
        this.store.select(state => state.TdnSiteConfigStateStore.customerEmail).subscribe(res => this.customerEmail = res)
        this.store.select(state => state.TdnSiteConfigStateStore.customerAdress).subscribe(res => this.customerAdress = res)
    }

}
