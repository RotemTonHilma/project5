import React, { useState } from "react";

export default function TodosButtons(props) {
    const [addTodo, setAddTodo] = useState(false);
    const [newTodo, setNewTodo] = useState("");
    const handleClick = () => {
        setAddTodo(true);
    };
    const handleChange = (event) => {
        setNewTodo(event.target.value);
    };
    const handleSubmit = () => {
        props.addTodo(newTodo);
        setNewTodo("");
        setAddTodo(false);
    };
    return (
        <>
            <select name="orderSelect" id="orderSelect" value={props.SortMethod} onChange={props.handleChangeSelect}>
                <option value="id">number</option>
                <option value="title">name</option>
                <option value="completed">checked</option>
            </select>
            {!addTodo ? (
                <button onClick={handleClick}>add</button>
            ) : (
                <div>
                    <input type="text" value={newTodo} onChange={handleChange} />
                    <button type="submit" onClick={handleSubmit}>
                        add
                    </button>
                </div>
            )}
        </>
    );
}
