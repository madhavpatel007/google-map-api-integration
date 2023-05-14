function TableRows(props) {
  const { rowsData, handleChange, deleteTableRows } = props;
  return rowsData.map((data, index) => {
    const { lat, lng } = data;
    return (
      <tr key={index}>
        <td>
          <input
            type="text"
            value={lat}
            onChange={(evnt) => handleChange(index, evnt)}
            name="lat"
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            value={lng}
            onChange={(evnt) => handleChange(index, evnt)}
            name="lng"
            className="form-control"
          />{" "}
        </td>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteTableRows(index)}
          >
            x
          </button>
        </td>
      </tr>
    );
  });
}

export default TableRows;
