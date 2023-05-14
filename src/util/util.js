export const removeNullValueObjects = (arr) => {
  const results = arr.filter((element) => {
    let valArr = Object.values(element);
    if (valArr.includes("")) return false;
    return true;
  });

  let finalArr = [];
  for (let i = 0; i < results.length; i++) {
    finalArr.push({
      lat: JSON.parse(results[i]["lat"]),
      lng: JSON.parse(results[i]["lng"]),
    });
  }
  return finalArr;
};

export const polygonOptions = {
  drawingMode: "polygon",
  drawingControl: true,
  drawingControlOptions: {
    drawingModes: ["polygon"],
  },
  polygonOptions: {
    fillColor: "#f00",
    fillOpacity: 0.5,
    strokeColor: "#f00",
    strokeOpacity: 1,
    strokeWeight: 2,
  },
};
