import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tdnpreviewer',
  templateUrl: './tdnpreviewer.component.html',
  styleUrls: ['./tdnpreviewer.component.css']
})
export class TDNPreviewerComponent implements OnInit {

  @Input() featureArray;

  @Output() back = new EventEmitter<boolean>();

  sectionListArray = [];

  constructor() {
  }
  ngOnInit(): void {

  }

  goBack() {
    this.back.emit(true);
  }
}
