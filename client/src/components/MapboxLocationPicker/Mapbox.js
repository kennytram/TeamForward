import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./Mapbox.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken = MAPBOX_TOKEN;

// TODO:
// [] move the map to a modal accessed from the user's edit profile page
// [] update the sidebar to show user more useful information
// [] change sidebar css to match other controls?

export default function Mapbox() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-98.9);
  const [lat, setLat] = useState(39.6);
  const [zoom, setZoom] = useState(4);

  // create the map
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  // ***** RUNNING THE APP IN STRICT MODE CAUSES THE
  // CONTROLS TO SHOW UP TWICE ON THE PAGE. THIS WILL
  // BE FIXED WHEN THE APP IS DEPLOYED, AS STRICT MODE
  // ONLY AFFECTS THE APP WHILE IT IS IN DEVELOPMENT ***** \\

  // add controls
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("load", () => {
      // add navigation controls to move map
      const navControl = new mapboxgl.NavigationControl();
      map.current.addControl(navControl, "top-right");

      // add geolocation control to the map
      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      });
      map.current.addControl(geolocateControl);

      // add search box
      map.current.addControl(
        new MapboxGeocoder({
          accessToken: MAPBOX_TOKEN,
          mapboxgl: mapboxgl,
        })
      );
    });
  }, [map]);

  // update map state when user clicks and drags or uses navigation controls
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [map]);

  return (
    <div className="container relative mx-auto overflow-hidden rounded-xl my-4">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
