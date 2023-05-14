import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLoadScript } from "@react-google-maps/api";
import "./MapOperations.css";
import CoOrdinatesList from "../CoOrdinatesList/CoOrdinatesList";
import AddDeleteTableRows from "../AddDeleteTableRows/AddDeleteTableRows";
import { displayToast } from "../../util/toastUtil";
import CustomGoogleMap from "./CustomGoogleMap/CustomGoogleMap";

function MapOperations() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ["drawing", "geometry"],
  });
  const center = useMemo(() => ({ lat: 23.033863, lng: 72.585022 }), []);

  const [path, setPath] = useState([]);
  const [totalArea, setTotalArea] = useState(0);
  const [checked, setChecked] = useState(false);
  const [polygonData, setPolygonData] = useState(null);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

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
    setPolygonData(polygon);
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

  useEffect(() => {
    if (polygonData) polygonData.setPaths([]);
  }, [polygonData]);

  return (
    <>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="chkbox">
            <input
              type="checkbox"
              checked={checked}
              onChange={handleCheckboxChange}
            />
            I want to add co-ordinates manually
          </div>
          <CustomGoogleMap getPaths={getPaths} path={path} />
        </>
      )}
      <div className="tables">
        {checked && (
          <AddDeleteTableRows
            className="add-delete-table"
            passCoOrdinatedToMap={drawPolygon}
          />
        )}
        {path && path.length > 0 && (
          <CoOrdinatesList className="coordinates-list" coOrdinates={path} totalArea={totalArea} />
        )}
      </div>
    </>
  );
}

export default MapOperations;
