import React from "react";

function CoOrdinatesList(props) {
  const { coOrdinates, totalArea, className } = props;
  const tableRows = [];

  for (let i = 0; i < coOrdinates.length; i++) {
    tableRows.push(
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{coOrdinates[i]?.lat}</td>
        <td>{coOrdinates[i]?.lng}</td>
      </tr>
    );
  }

  const displayCoOrdinates = () => {
    return (
      <>
        <table border={5} className={className}>
          <thead>
            <th>No.</th>
            <th>LAT</th>
            <th>LNG</th>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
        <h1>
          TOTAL AREA COVERED BY A POLYGON IS:{" "}
          <u>
            {totalArea} m<sup>2</sup>
          </u>
        </h1>
      </>
    );
  };

  return displayCoOrdinates();
}

export default CoOrdinatesList;
