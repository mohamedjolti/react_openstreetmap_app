import { Marker, Popup } from "react-leaflet";
import { Component } from "react";
import { geolocated } from "react-geolocated";
import {TileLayer } from "react-leaflet"
import { Map } from 'react-leaflet';


import './App.css';
const DEFAULT_LATITUDE=48;
const DEFAULT_LANGITUDE=-128;

class App extends Component {

  
  render(){
    const langitude= this.props.coords ? this.props.coords.longitude : DEFAULT_LANGITUDE
    const latitude= this.props.coords ? this.props.coords.latitude : DEFAULT_LATITUDE
  return (
         <Map zoom={12} center={[latitude,langitude]}>
             <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'></TileLayer>    
        {
          !this.props.coords?
          <div className="loading">Loading</div>
          :
          <Marker position={[latitude,langitude]}>
            <Popup>
              Your are here
            </Popup>
          </Marker>

         
        }
         </Map>
  );
}
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
