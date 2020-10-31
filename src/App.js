  
import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet";

const height = { height: "100vh" };
const center = { lat: 35.770390, lng: -5.803610 };

class MapExample extends Component {

  state={
        city:"Tangier",
        temperature:295.15,
        pressure:1024,
        humidity:64
  }
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
          console.log(r);
          this.setState({
            city:r.properties.address.city
          })
          console.log(r.properties.address.city);
          const city=r.properties.address.city
          if(city){
          fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${r.properties.address.city}&appid=bb8db9a16f62b122752372804974e78d`,{
            headers:new Headers({
              appid:process.env.REACT_APP_APP_ID
            })
          })
        .then(response =>response.json() ).then(data=>{
            console.log(data);
          this.setState({
            temperature:data.main.temp,
            pressure:data.main.pressure,
            humidity:data.main.humidity
          })
          
        })
.catch(err => {
	console.log(err);
});
          }
          if (r) {
            if (marker) {
              marker
                .setLatLng(r.center)
                .setPopupContent("you choosed the city  :" +this.state.city +  ", the temperature in this city " +this.state.temperature + " and the pressure  "+ this.state.pressure)
                .openPopup();
            } else {
              marker = L.marker(r.center)
                .bindPopup("No city selected")
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