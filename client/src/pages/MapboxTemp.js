import React from "react";
import Mapbox from "../components/MapboxLocationPicker/Mapbox";
import { NavLink } from "react-router-dom";

const MapboxTemp = () => {
  return (
    <div>
      <h1>MAPBOX TEST PAGE</h1>
      <NavLink
        to="/feed"
        className="text-lg text-start font-semibold border p-1 rounded-lg shadow-lg block w-full"
      >
        Dashboard
      </NavLink>
      <Mapbox />
    </div>
  );
};

export default MapboxTemp;
