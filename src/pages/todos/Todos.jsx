import { useState } from "react";
import { useLoggedUser } from "../../context/LoggedUserContext";
import { useFetch } from "../../custom-hooks/useFetch";

export default function Todos() {
    const { loggedUser } = useLoggedUser();
    const [url, seturl] = useState(`http://localhost:3000/todos?userId=${loggedUser.id}`);

    const { data: myTodos, isLoading } = useFetch(url);
    console.log("isLoading: ", isLoading);
    console.log("myTodos: ", myTodos);

    return (
        <ul>
            {!isLoading &&
                myTodos.map((item) => {
                    return (
                        <li key={item.id}>
                            <label htmlFor={item.title}>{item.title}</label>
                            <input type="checkbox" name={item.title} checked={item.completed} />
                        </li>
                    );
                })}
        </ul>
    );
}
