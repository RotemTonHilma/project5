import { useState } from "react";
import { useLoggedUser } from "../../context/LoggedUserContext";
import { useFetch } from "../../custom-hooks/useFetch";
import { sortData, updateDataBase } from "../../utils/utils";

export default function Todos() {
    const { loggedUser } = useLoggedUser();
    const url = `http://localhost:3000/todos?userId=${loggedUser.id}`;
    const [SortMethod, setSortMethod] = useState("id");

    const { data: myTodos, isLoading, setData } = useFetch(url);

    let sortedTodos;
    if (!isLoading) sortedTodos = sortData(myTodos, SortMethod);
    const handleChangeSelect = (event) => setSortMethod(event.target.value);

    const handleChangeCheck = (event) => {
        updateDataBase(`http://localhost:3000/todos/${event.target.name}`, {
            method: "PATCH",
            body: { completed: event.target.checked },
            headers: { "Content-Type": "application/json" },
        });
        setData((prev) => prev.map((item) => (item.id === event.target.name ? { ...item, completed: event.target.checked } : item)));
    };

    const handleClickAdd = () => {};
    return (
        <>
            <select name="orderSelect" id="orderSelect" value={SortMethod} onChange={handleChangeSelect}>
                <option value="id">number</option>
                <option value="title">name</option>
                <option value="completed">checked</option>
            </select>
            <button onClick={handleClickAdd}>add</button>
            <ul>
                {!isLoading &&
                    sortedTodos.map((item) => {
                        return (
                            <li key={item.id}>
                                <label htmlFor={item.title}>{`${item.id}.  ${item.title}`}</label>
                                <input type="checkbox" name={item.id} checked={item.completed} onChange={handleChangeCheck} />
                            </li>
                        );
                    })}
            </ul>
        </>
    );
}
