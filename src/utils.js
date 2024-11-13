
export async function fetchUsers() {
    try {
        const res = await fetch("http://localhost:3000/users");
        if (!res.ok) throw Error("unable to obtain users");
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}


export async function fetchGet(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw Error("unable to obtain item");
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export function userFromArray(userArray, userInputs) {
    return userArray.find((user) => user.username === userInputs.username && user.website === userInputs.website);
}


export function chooseNextId(arr) {
    //arg: array of objects with an id property
    const objMaxId = arr.reduce((prev, current) => {
        return (parseInt(prev.id) > parseInt(current.id))
            ? prev : current
    });
    return parseInt(objMaxId.id) + 1;
}

export async function addItem(url, newItem, nextId) {
    try {
        if (typeof nextId !== "number") throw Error("Error with array. Ids not numbers");
        newItem = { ...newItem, "id": nextId };

        //add to database
        const res = await fetch(url,
            {
                method: "POST",
                body: JSON.stringify(newItem),
                headers: { "Content-Type": "application/json" }
            });
        if (!res.ok) throw Error("Unable to add item");
        return true;

    }
    catch (err) {
        console.log(err);
        return false;
    }
}


export function searchArr(arr, filters) {
    //array of objects with keys (strings)
    return arr.filter((obj) => {
        let flag = true;
        for (let [key, value] of Object.entries(filters)) {
            if (value === "") continue;
            if (!obj[key].toString().includes(value.toString())) flag = false;
        }
        return flag;
    });
}

export function createShowingObject(arr) {
    const sObj = {};
    for (let i in arr) {
        sObj[arr[i].id] = false;
    }
    return sObj;
}