  
import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet";
import  { Marker, Popup } from "react-leaflet"
import { geolocated } from "react-geolocated";
const height = { height: "100vh" };
const center = { lat: 51.509865  , lng: -0.118092};

class MapExample extends Component {

  state={
        map:null,
        geocoder:null,
        city:"London",
        temperature:287,
        pressure:1007,
        humidity:78,
        latLan:center
  }
  GetData(e){

    this.setState({
      latLan:e.latlng
    })
    const map=this.state.map
    const geocoder=this.state.geocoder
    console.log("clicked");
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

      }
    );
  }
  componentDidMount() {
    this.setState({
       map : this.leafletMap.leafletElement,
       geocoder : L.Control.Geocoder.nominatim()
    })  


  }

  render() {
    return (
      <Map
        onclick={(e)=>this.GetData(e)}
        style={height}
        center={this.state.latLan}
        zoom={18}
        ref={m => {
          this.leafletMap = m;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
            <Marker position={this.state.latLan}>
      <Popup>
      you choosed the city  : {this.state.city}   , the temperature in this city  {this.state.temperature }  and the pressure  +{ this.state.pressure}      </Popup>
    </Marker>
      </Map>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(MapExample);