import { Injectable } from '@angular/core';
import {MapService} from "./map.service";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  infoWindow: google.maps.InfoWindow;

  constructor(private mapService: MapService) { }

  handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(this.mapService.map$.value);
  }

  public centerMapAtGeolocation() {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent("Позицію знайдено");
        this.infoWindow.open(this.mapService.map$.value);
        this.mapService.map$.value.setCenter(pos);
      },
      () => {
        this.handleLocationError(true, this.infoWindow, this.mapService.map$.value.getCenter()!);
      }
    );
  }

  getInfoWindowInstance() {
    this.infoWindow = new google.maps.InfoWindow()
    return this.infoWindow;
  }
}
