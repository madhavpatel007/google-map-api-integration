import { useState } from "react";
import TableRows from "./TableRows/TableRows";
import { removeNullValueObjects } from "../../util/util";
import { displayToast } from "../../util/toastUtil";
import "./AddDeleteTableRows.css";

function AddDeleteTableRows(props) {
  const { passCoOrdinatedToMap } = props;

  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {
    const rowsInput = {
      lat: "",
      lng: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };

  const submitCoOrdinates = () => {
    let cleanArr = removeNullValueObjects(rowsData);
    if (cleanArr && cleanArr.length >= 5) {
      if (
        JSON.stringify(cleanArr[0]) !==
        JSON.stringify(cleanArr[cleanArr.length - 1])
      ) {
        displayToast("ERROR", "First and last must be same");
      } else {
        cleanArr.pop();
        passCoOrdinatedToMap(cleanArr);
      }
    } else {
      displayToast("ERROR", "Minimum 4 points requires");
    }
  };

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };
  return (
    <>
      <table border={5}>
        <thead>
          <tr>
            <th>LAT</th>
            <th>LNG</th>
            <th>
              <button
                className="btn btn-outline-success"
                onClick={addTableRows}
              >
                +
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRows
            rowsData={rowsData}
            deleteTableRows={deleteTableRows}
            handleChange={handleChange}
          />
        </tbody>
      </table>
      <button className="btn-submit" onClick={() => submitCoOrdinates()}>
        SUBMIT
      </button>
    </>
  );
}
export default AddDeleteTableRows;
