import React from "react";

export default function Todo(props) {
    return (
        <li key={props.id}>
            <label htmlFor={props.title}>{`${props.id}.  ${props.title}`}</label>
            <input type="checkbox" name={props.id} checked={props.completed} onChange={props.handleChangeCheck} />
            <button onClick={props.deleteTodo} name={props.id}>
                delete
            </button>
        </li>
    );
}
