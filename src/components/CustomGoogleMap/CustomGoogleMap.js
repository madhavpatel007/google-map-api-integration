import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DrawingManager,
  GoogleMap,
  LoadScript,
  Polygon,
  useLoadScript,
} from "@react-google-maps/api";
import "./CustomGoogleMap.css";
import CoOrdinatesList from "../CoOrdinatesList/CoOrdinatesList";
import AddDeleteTableRows from "../AddDeleteTableRows/AddDeleteTableRows";
import { displayToast } from "../../util/toastUtil";

function CustomGoogleMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ["drawing", "geometry"],
  });
  const center = useMemo(
    () => ({ lat: 52.52047739093263, lng: 13.36653284549709 }),
    []
  );

  const [path, setPath] = useState([
    // { lat: 52.52549080781086, lng: 13.398118538856465 },
    // { lat: 52.48578559055679, lng: 13.36653284549709 },
    // { lat: 52.48871246221608, lng: 13.44618372440334 },
  ]);
  const [totalArea, setTotalArea] = useState(0);
  const [checked, setChecked] = useState(false);
  const [polygonData, setPolygonData] = useState(null);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    (polygon) => {
      const path = polygon.getPath();
      setTotalArea(window.google.maps.geometry.spherical.computeArea(path));
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  function drawPolygon(coOrdinates) {
    setPath(coOrdinates);
    setTotalArea(
      window.google.maps.geometry.spherical.computeArea(
        new window.google.maps.Polygon({
          paths: coOrdinates,
        }).getPath()
      )
    );
  }

  function getPaths(polygon) {
    var polygonBounds = polygon.getPath();
    setTotalArea(
      window.google.maps.geometry.spherical.computeArea(polygonBounds)
    );
    var bounds = [];
    if (polygonBounds.length > 3) {
      for (var i = 0; i < polygonBounds.length; i++) {
        var point = {
          lat: polygonBounds.getAt(i).lat(),
          lng: polygonBounds.getAt(i).lng(),
        };
        bounds.push(point);
      }
      setPath(bounds);
    } else {
      displayToast("ERROR", "Minimum 4 CoOrdinates Required.");
    }
  }

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  return (
    <>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleCheckboxChange}
            />
            I want to add co-codinates manually
          </div>
          <div className="google-map-container">
            <GoogleMap
              mapContainerClassName="google-map"
              center={center}
              zoom={12}
            >
              <Polygon
                // Make the Polygon editable / draggable
                editable
                draggable
                path={path}
                ref={polygonRef}
                // Event used when manipulating and adding points
                onMouseUp={onEdit}
                // Event used when dragging the whole Polygon
                onDragEnd={onEdit}
                onLoad={onLoad}
                onUnmount={onUnmount}
              />
              <DrawingManager
                drawingMode="polygon"
                editable
                draggable
                onPolygonComplete={(value) => getPaths(value)}
                // onCircleComplete={(value) => getPaths(value)}
              />
            </GoogleMap>
          </div>
        </>
      )}
      {checked && <AddDeleteTableRows passCoOrdinatedToMap={drawPolygon} />}
      {path && path.length > 0 && (
        <CoOrdinatesList coOrdinates={path} totalArea={totalArea} />
      )}
    </>
  );
}

export default CustomGoogleMap;
