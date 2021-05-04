import { SafeUrl } from "@angular/platform-browser";

export default class HeaderConfigModel {
    //General
    flexDirectionProperty : string = 'row';
    backgroundColorProperty : string = 'rgba(0,0,0,0)';

    //logo
    logoImage : string | SafeUrl;
    logoLeftOffset : string = "0vw";

    //Bouttons nav
    buttonsPosProperty : string = "center";
    buttonColorProperty : string;
    buttonBackgroundColorProperty : string;
    buttonHoverColorProperty : string;
    buttonMargins: string = '5px';
    //PaysDropdownList

}
