export const mobileWidth = 600;

/**
 * takes an interval and determines the values that need to be set in order to zoom.
 * @returns returns a zoom object
 */
export const handleZoom = (zoom, up = true) => {
  let interval = up ? 1 : -1;

  let typeCounts = {
    'day': [7, 15, 31],
    'month': [7, 13]
  };

  if (window.innerWidth < mobileWidth) {
    typeCounts = {
      'day': [3, 5],
      'month': [3, 5]
    };
  }

  const types = Object.keys(typeCounts);
  const type = zoom.type || 'day';
  const count = zoom.count || typeCounts[type][1];
  let counts = typeCounts[type];

  let countIndex = counts.indexOf(count) + interval; // update countIndex
  let typeIndex = types.indexOf(type);

  if (up === null) {
    interval = 0;
    countIndex = 0;
  }

  if (countIndex >= counts.length || countIndex < 0) {
    typeIndex += interval; // update typeIndex
    counts = typeCounts[types[typeIndex]]; // update counts list

    if (!counts) { // uh-oh it's not there
        typeIndex = resetValue(types.length); // reset typeIndex
        counts = typeCounts[types[typeIndex]]; // update counts list
    }

    countIndex = resetValue(counts.length); // reset typeIndex
  }

  let height = types[typeIndex] === 'day' ? 1 : .25;

  return {
    type: types[typeIndex],
    count: counts[countIndex],
    max: (typeIndex + 1 >= types.length) &&
    (countIndex + 1 >= counts.length),
    min: (typeIndex === 0) &&
    (countIndex === 0),
    height: height + (counts.length - countIndex) * .5
  };

  // common logic to set reset value based on going up or down
  function resetValue (length) {
    return up ? 0 : length + interval;
  }
};


export const defaultZoomLevel = handleZoom({}, null);
