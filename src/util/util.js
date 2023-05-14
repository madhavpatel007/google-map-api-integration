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
