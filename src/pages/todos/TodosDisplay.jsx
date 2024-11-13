import { useState } from "react";
import { useLoggedUser } from "../../context/LoggedUserContext";
import { useFetch } from "../../custom-hooks/useFetch";
import { chooseNextId, sortData, updateDataBase } from "../../utils/utils";
import Todo from "./Todo";
import TodosButtons from "./TodosButtons";

export default function TodosDisplay() {
    const { loggedUser } = useLoggedUser();
    const url = `http://localhost:3000/todos?userId=${loggedUser.id}`;
    const [SortMethod, setSortMethod] = useState("id");

    const { data: myTodos, isLoading, setData } = useFetch(url);

    const { data: allTodos } = useFetch("http://localhost:3000/todos");
    console.log("allTodos: ", allTodos);

    let sortedTodos;
    if (!isLoading) sortedTodos = sortData(myTodos, SortMethod);
    console.log("sortedTodos: ", sortedTodos);
    const handleChangeSelect = (event) => setSortMethod(event.target.value);

    const handleChangeCheck = (event) => {
        updateDataBase(`http://localhost:3000/todos/${event.target.name}`, {
            method: "PATCH",
            body: { completed: event.target.checked },
            headers: { "Content-Type": "application/json" },
        });
        setData((prev) => prev.map((item) => (item.id === event.target.name ? { ...item, completed: event.target.checked } : item)));
    };

    const addTodo = (todo) => {
        const availableID = chooseNextId(allTodos);
        const newTodo = {
            userId: loggedUser.id,
            id: availableID.toString(),
            title: todo,
            completed: false,
        };
        updateDataBase("http://localhost:3000/todos", {
            method: "Post",
            body: newTodo,
            headers: { "Content-Type": "application/json" },
        });
        setData((prev) => [...prev, newTodo]);
    };

    const deleteTodo = (event) => {
        console.log("event: ", event.target);
        updateDataBase(`http://localhost:3000/todos/${event.target.name}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        setData((prev) => prev.filter((item) => !(item.id === event.target.name)));
    };

    return (
        <>
            <TodosButtons SortMethod={SortMethod} handleChangeSelect={handleChangeSelect} addTodo={addTodo} />

            <ul>
                {!isLoading &&
                    sortedTodos.map((item) => (
                        <Todo
                            id={item.id}
                            title={item.title}
                            completed={item.completed}
                            handleChangeCheck={handleChangeCheck}
                            key={item.id}
                            deleteTodo={deleteTodo}
                        />
                    ))}
            </ul>
        </>
    );
}
