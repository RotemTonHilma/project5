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

export async function addUser(newUser, nextId) {
    try {
        if (typeof nextId !== "number") throw Error("Error with array. Ids not numbers");
        newUser = { ...newUser, "id": nextId };

        //add to database
        const res = await fetch("http://localhost:3000/users", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" }
        });
        if (!res.ok) throw Error("Unable to add user");
        return true;

    }
    catch (err) {
        console.log(err);
        return false;
    }
}