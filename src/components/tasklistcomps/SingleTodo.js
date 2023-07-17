import React, { useState } from "react";
import pic from "./images/trash.png";
import Dropdown from "./TodoComponents/Dropdown";

const SingleTodo = ({ todo, todoList, setTodoList }) => {

    const [showDropdown, setShowDropdown] = useState(false);

    const handleCheck = (id) => {
        const newtodoList = todoList.map((todo) => {
            const _todo = { ...todo };

            if (_todo.id === id) {
                if (_todo.status === '1') {
                    _todo.status = '0'
                } else {
                    _todo.status = '1'
                }
            }

            return _todo;
        });

        setTodoList(newtodoList);
    }

    const handleDelete = (id) => {
        const newtodoList = todoList.map((todo) => {
            if (todo.id === id) {
                todo.status = 'deleted';
            }
            return todo;
        });
        setTodoList(newtodoList.filter((todo) => todo.status !== 'deleted'));
    }

    return (
        <div className="task-container">
            <div onClick={() => setShowDropdown(!showDropdown)} className="task" id={todo.id}>
                <input type="checkbox" defaultChecked={todo.status === '0' ? true : false} onClick={() => handleCheck(todo.id)} />
                <span className="task-text">{todo.text}</span>
                <span className="date-bar">{todo.date && new Date(todo.date).toLocaleDateString()}</span>
                <img className="delete-button" src={pic} alt="Trash Icon" onClick={() => handleDelete(todo.id)} />
            </div>
            {showDropdown && <Dropdown todo={todo} todoList={todoList} setTodoList={setTodoList} />}

        </div>
    )
}

export default SingleTodo;