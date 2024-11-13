const compare = (key, itemA, itemB) => {
    if (parseInt(itemA[key])) {
        if (parseInt(itemA[key]) <= parseInt(itemB[key])) return -1;
        return 1;
    } else if (typeof itemA[key] === "string") {
        return itemA[key].localeCompare(itemB[key]);
    } else {
        if (itemA[key]) return -1;
        return 1;
    }
};

export const sortData = (data, key) => {
    const sortedData = data.toSorted((a, b) => compare(key, a, b));
    return sortedData;
};

export const updateDataBase = async (url, options) => {
    try {
        const response = await fetch(url, { ...options, body: JSON.stringify(options.body) });
        if (!response.ok) throw new Error("unable to fetch data");
    } catch (e) {
        console.log(e);
    }
};
