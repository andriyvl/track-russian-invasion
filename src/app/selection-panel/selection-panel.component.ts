import { Component, OnInit } from '@angular/core';
import {militaryObjects} from "../constants/military-objects";
import {MapService} from "../services/map.service";
import {MilitaryModel} from "../models/military.model";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-selection-panel',
  templateUrl: './selection-panel.component.html',
  styleUrls: ['./selection-panel.component.scss']
})
export class SelectionPanelComponent implements OnInit {

  get selectedUnit(): MilitaryModel {
    return this._selectedUnit;
  }
  set selectedUnit(value: MilitaryModel) {
    this._selectedUnit = value;
  }
  // @ts-ignore
  private _selectedUnit: MilitaryModel = {};

  militaryObjects = Object.values(militaryObjects);
  // @ts-ignore

  dateString: string = '';
  timeSting: string = '00:00';
  lastSeenDateTime: Date = null;
  quantity: string = '';
  direction: string = '';
  constantLocation: boolean = false;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

  onLastSeenDateChange(event: MatDatepickerInputEvent<any>) {
    const date: Date = new Date(event.value);
    this.dateString = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + date.getDate();
    this.createLastSeenDateTime();
  }

  private createLastSeenDateTime(): void {
    const dateTimeString = this.dateString + 'T' + this.timeSting+':00.000+02:00';
    const date = new Date(dateTimeString);
    this.selectedUnit.lastSeenDateTime = date;
  }

  onMilitaryObjectTypeChange(value: MilitaryModel) {
    this.selectedUnit = value;
    this.mapService.placeMarker(this.selectedUnit);
    this.mapService.clearPlaceholderMarker();
  }

  onTimeSelected(time: string) {
    this.timeSting = time;
    this.createLastSeenDateTime();
  }

  onDirectionSelected(direction: string) {
    this.selectedUnit.direction = direction;
  }

  onQuantitySelected(quantity: string) {
    this.selectedUnit.quantity = quantity;
  }

  onConstantLocationSelected(constantLocation: boolean) {
    this.selectedUnit.constantLocation = constantLocation;
  }

  private resetDateTime() {
    this.lastSeenDateTime = null;
  }

  submitUnit() {
    this.mapService.submitMilitaryUnitData(this.selectedUnit);
    // @ts-ignore
    this.selectedUnit = {};
  }

  clearMarker() {
    this.mapService.clearMarkerSelection();
  }
}
