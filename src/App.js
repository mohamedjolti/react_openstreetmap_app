import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet";

const height = { height: "100vh" };
const center = { lat: 51.5, lng: 0.12 };

class MapExample extends Component {
  componentDidMount() {
    const map = this.leafletMap.leafletElement;
    const geocoder = L.Control.Geocoder.nominatim();
    let marker;

    map.on("click", e => {
      geocoder.reverse(
        e.latlng,
        map.options.crs.scale(map.getZoom()),
        results => {
          var r = results[0];
          if (r) {
            if (marker) {
              marker
                .setLatLng(r.center)
                .setPopupContent(r.html || r.name)
                .openPopup();
            } else {
              marker = L.marker(r.center)
                .bindPopup(r.name)
                .addTo(map)
                .openPopup();
            }
          }
        }
      );
    });
  }

  render() {
    return (
      <Map
        style={height}
        center={center}
        zoom={18}
        ref={m => {
          this.leafletMap = m;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    );
  }
}

export default MapExample;
