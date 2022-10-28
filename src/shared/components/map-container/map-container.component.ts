import { Position } from './position.model';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import * as L from "leaflet";
import { icon, Icon, Marker } from "leaflet";
import { Observable, Subscription } from 'rxjs';

@Component({
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
  selector: 'app-map-container'
})
export class MapContainer implements OnInit, OnDestroy {
  @Input() selectedPosition: Position = {
    lat: 50.0602,
    long: 19.9374
  };
  @Input()
  @Input() isSelectable: boolean = true;
  @Output() locationChanged: EventEmitter<Position> = new EventEmitter();
  @Input()
  events!: Observable<Position>;

  private map!: L.Map;
  private centroid: L.LatLngExpression = [50.0602, 19.9374];
  private marker!: Marker;
  private defaultIcon: Icon = icon({
    iconUrl: 'assets/localization.png',
    iconSize: [20, 20],
    iconAnchor: [0, 0],
    popupAnchor: [-3, -76]
  });

  subs: Subscription[] = [];

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    if (this.marker === undefined) {
      this.marker = L.marker([this.selectedPosition.lat, this.selectedPosition.long], { draggable: true });
      this.marker.addTo(this.map);
    }

    this.map.on("click", (e: any) => {
      if (this.marker != null) this.map.removeLayer(this.marker);
      this.marker = L.marker([e.latlng.lat, e.latlng.lng], { draggable: true });
      this.marker.addTo(this.map);
      this.locationChanged.emit({
        lat: e.latlng.lat,
        long: e.latlng.lng
      });
    });
  }

  ngOnInit() {
    Marker.prototype.options.icon = this.defaultIcon;
    this.initMap();
    this.subs.push(this.events.subscribe({
      next: (position: Position) => {
        if (this.marker != null) this.map.removeLayer(this.marker);
        this.marker = L.marker([position.lat, position.long], { draggable: true });
        this.marker.addTo(this.map);
        this.map.setView([position.lat, position.long]);
      },
      error: (e) => { console.log(e) }
    }))
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => {
      if (s) s.unsubscribe();
    });
  }
}
