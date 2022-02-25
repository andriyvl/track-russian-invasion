import {Component, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import {militaryObjects} from "./constants/military-objects";
import {locations} from "./constants/locations";
import {MapService} from "./services/map.service";
import {GeolocationService} from "./services/geolocation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'track-russian-bastards';

  @ViewChild('map', {static: true}) mapElement: any;
  // @ts-ignore
  map: google.maps.Map;
  // @ts-ignore
  infoWindow: google.maps.InfoWindow;

  constructor(public mapService: MapService, private geolocationService :GeolocationService) {
  }


  ngOnInit(): void {
    this.infoWindow = this.geolocationService.getInfoWindowInstance();


    const mapProperties = {
      center: new google.maps.LatLng(50.43, 30.51),
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.mapService.map$.next(new google.maps.Map(this.mapElement.nativeElement, mapProperties));

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    this.mapService.map$.value.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    this.centerMap();

    this.addMarkerOnMapClick();

    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        this.geolocationService.centerMapAtGeolocation();
      } else {
        // Browser doesn't support Geolocation
        this.geolocationService.handleLocationError(false, this.infoWindow, this.mapService.map$.value.getCenter()!);
      }
    })

  }

  private centerMap() {
    let marker;

    for (let i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: locations[i].position,
        icon: militaryObjects[locations[i].type].icon,
        map: this.mapService.map$.value,
      });
    }
  }


  private addMarkerOnMapClick() {
    google.maps.event.addListener(this.mapService.map$.value, 'click', (event) => {
      if (this.mapService.selectedMapLocation$.value === null) {
        this.mapService.selectMarkerType(event.latLng)
      }
    });
  }
}
