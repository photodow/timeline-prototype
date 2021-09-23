/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * @returns an array of arrays containing items.
 */
export const assignLanes = (items) =>  {
    const sortedItems = items.sort((a, b) =>
        new Date(a.start) - new Date(b.start)
    );
    const lanes = [];

    function assignItemToLane(item) {
        for (const lane of lanes) {
            // last item in lane's end date < item start date
            // could be event at same time
            if (new Date(lane[lane.length - 1].end) < new Date(item.start)) {
                lane.push(item);
                return;
            }
        }
        // [[item], [item, item, item]] // 2 lanes
        lanes.push([item]);
    }

    for (const item of sortedItems) {
        assignItemToLane(item);
    }

    return lanes;
}
