import React, { useMemo, useRef } from "react";
import {
  DrawingManager,
  GoogleMap,
  Polygon,
  useLoadScript,
} from "@react-google-maps/api";
import "./CustomGoogleMap.css";
import { polygonOptions } from "../../../util/util";

function CustomGoogleMap(props) {
  const { getPaths, path } = props;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ["drawing", "geometry"],
  });
  const center = useMemo(() => ({ lat: 23.033863, lng: 72.585022 }), []);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);

  return (
    <>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <div className="google-map-container">
          <GoogleMap
            mapContainerClassName="google-map"
            center={center}
            zoom={12}
          >
            <Polygon editable draggable path={path} ref={polygonRef} />
            <DrawingManager
              options={polygonOptions}
              onPolygonComplete={(value) => getPaths(value)}
            />
          </GoogleMap>
        </div>
      )}
    </>
  );
}

export default CustomGoogleMap;
