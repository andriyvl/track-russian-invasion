import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import LatLng = google.maps.LatLng;
import {militaryObjects} from "../constants/military-objects";
import {MilitaryModel} from "../models/military.model";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  placeHolderMarker: any = null;
  selectionMarker: any = null;
  selectedMapLocation$: BehaviorSubject<LatLng | null> = new BehaviorSubject(null);
  mapClickMade: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // @ts-ignore
  map$: BehaviorSubject<google.maps.Map> = new BehaviorSubject<google.maps.Map>(null);

  constructor() { }

  selectMarkerType(latLng: LatLng) {
    this.selectedMapLocation$.next(latLng);
    this.createPlaceholderMarker();
    this.mapClickMade.next(true);
  }

  placeMarker(militaryObjectType: MilitaryModel): void {
    this.selectionMarker = new google.maps.Marker({
      position: this.selectedMapLocation$.value,
      map: this.map$.value,
      icon: militaryObjects[militaryObjectType.name].icon
    });
  }

  submitMilitaryUnitData(selectedUnit: MilitaryModel) {
    console.log('submit!');
    console.log(selectedUnit);
    this.selectedMapLocation$.next(null);
  }

  private createPlaceholderMarker() {
    this.placeHolderMarker = new google.maps.Marker({
      position: this.selectedMapLocation$.value,
      map: this.map$.value,
    });
  }

  clearPlaceholderMarker() {
    this.placeHolderMarker.setMap(null);
  }

  clearMarkerSelection() {
    this.selectedMapLocation$.next(null);
    this.placeHolderMarker?.setMap(null);
    this.selectionMarker?.setMap(null);
  }
}
