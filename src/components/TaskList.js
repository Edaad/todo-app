import React from "react";
import { useEffect, useState } from "react"
import SingleTodo from "./tasklistcomps/SingleTodo";
import TextField from "./tasklistcomps/TextField";
import AddButton from "./tasklistcomps/AddButton";
import ClearButton from "./tasklistcomps/ClearButton";
import arrowpic from "./tasklistcomps/images/arrow.png"
import { useSelector } from "react-redux";


const TaskList = () => {
    const { username } = useSelector((state) => state.currentUser);
    const [text, setText] = useState("");
    const [todoList, setTodoList] = useState(() => {
        const getSavedTasks = localStorage.getItem(username);
        const savedTasks = JSON.parse(getSavedTasks);
        return savedTasks || [];
    });
    const [showCompleted, setShowCompleted] = useState(false);


    useEffect(() => {
        localStorage.setItem(username, JSON.stringify(todoList));
    }, [todoList]);

    return (
        <div>
            <div>
                {/* <h1 className="h1">To-Do List</h1> */}
                <TextField text={text} setText={setText} todoList={todoList} setTodoList={setTodoList} />
                <AddButton text={text} setText={setText} todoList={todoList} setTodoList={setTodoList} />
            </div>
            <br />
            <div >
                {todoList.length > 0 && todoList.filter((todo) => todo.status === '1').map((todo) => (
                    <SingleTodo todo={todo} todoList={todoList} setTodoList={setTodoList} key={todo.id} />
                ))}
                <br></br>
                <ClearButton setTodoList={setTodoList} />
            </div>
            <div>
                <h1 className="h1">Completed Tasks
                    <input type="checkbox" id="arrowCheck" />
                    <label className="arrowLabel" for="arrowCheck" onClick={() => setShowCompleted(!showCompleted)}>
                        <img src={arrowpic} id="arrow" alt="Arrow Pic" />
                    </label>
                </h1>
                {showCompleted && <div className="completed">
                    {todoList.length > 0 && todoList.filter((todo) => todo.status === '0').map((todo) => (
                        <SingleTodo todo={todo} todoList={todoList} setTodoList={setTodoList} key={todo.id} />
                    ))}
                </div>}
            </div>
        </div>
    )
}

export default TaskList;