import React from 'react';
import {FilterPropsType} from "./AppWithReducer";
import '../app/App.css'

import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import {CheckBox} from "../components/CheckBox"
import {Delete} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {IconButton} from "@mui/material";
import {DomainTaskType, TaskStatuses, TaskType} from "../api/tasks-api";

export type TasksStateType = {
    [key: string]: Array<DomainTaskType>
}

type PropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (todoListID: string, id: string) => void
    filter: FilterPropsType
    changeFilter: (todoListID: string, value: FilterPropsType) => void
    addTask: (title: string, value: string) => void
    onChangeTaskStatus: (todoListID: string, id: string, status:TaskStatuses) => void
    active: boolean
    removeTodoLists: (todoListID: string) => void
    upDateTodoListTitle: (todoListID: string, title: string) => void
    upDateTaskTitle: (todoListID: string, taskID: string, title: string) => void
}

export function TodolistWithReducer(props: PropsType) {
    // let [title, setValue] = useState('')
    // let [error, setError] = useState<boolean>(false)

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     let title = e.currentTarget.value
    //     setValue(title)
    //     setError(false)
    //
    // }
    // const onCLickHandler = () => {
    //
    //     if (title.trim() !== '') {
    //         props.addTask(props.todoListID, title)
    //     } else {
    //         setError(true)
    //     }
    //     setValue('')
    // }
    const editTitleTask = (id: string, title: string) => {
        props.upDateTaskTitle(props.todoListID, id, title)
    }
    const editTitleTodolist = (title: string) => {
        props.upDateTodoListTitle(props.todoListID, title)

    }
    const addTodoListHandler = (title: string) => {
        props.addTask(props.todoListID, title)
    }

    const onAllClickHandler = () => {
        props.changeFilter(props.todoListID, 'All')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todoListID, 'Active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todoListID, 'Completed')
    }
    const onRemoveClickHandler = (id: string) => props.removeTasks(props.todoListID, id)

    const onChangeHandler = (id: string, e:boolean) => {
        props.onChangeTaskStatus(props.todoListID, id, e?TaskStatuses.Completed:TaskStatuses.New)
    }

    return <div>
        <h3>
            <EditableSpan callBack={editTitleTodolist} title={props.title}/>
            <IconButton aria-label="delete">
                <Delete onClick={() => props.removeTodoLists(props.todoListID)}/>
            </IconButton>
            {/*<Button callBack={props.removeTodoLists} todoListID={props.todoListID} title={'x'} className={''}/>*/}
            {/*<button onClick={() => props.removeTodoLists(props.todoListID)}>X</button>*/}
        </h3>

        <div>
            <AddItemForm
                callBack={addTodoListHandler}
                // todoListID={props.todoListID}
            />
        </div>
        <ul>{props.tasks.map((t) => {
            // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            //     let isDone = e.currentTarget.checked
            //     props.onChangeTaskStatus(props.todoListID, t.id, t.isDone = isDone)
            // }
            return (
                <li className={t.status ? "is-done" : ""} key={t.id}>
                    <IconButton aria-label="delete">
                        <Delete onClick={() => props.removeTasks(props.todoListID, t.id)}/>
                    </IconButton>
                    {/*    <Button*/}
                    {/*    todoListID={props.todoListID}*/}
                    {/*    callBack={() => onRemoveClickHandler(t.id)}*/}
                    {/*    title={"x"}*/}
                    {/*    className={''}*/}
                    {/*/>*/}
                    {/*<Checkbox defaultChecked*/}
                    {/*          color={'primary'}*/}
                    {/*          checked={t.isDone}*/}
                    {/*          onChange={onChangeHandler}/>*/}
                    <CheckBox
                        checked={t.status===TaskStatuses.Completed}
                        callBack={(e) => onChangeHandler(t.id, e)}/>

                    {/*<input type="checkbox"*/}
                    {/*       checked={t.isDone}*/}
                    {/*       onChange={(e)=>onChangeHandler(t.id, t.isDone, e.currentTarget.checked)}*/}
                    {/*/>*/}
                    <EditableSpan callBack={(title) => editTitleTask(t.id, title)} title={t.title}/>
                    {/*<span>{t.title}</span>*/}
                </li>
            )
        })}
        </ul>
        <div>
            <Button onClick={onAllClickHandler} variant="contained" style={{background: 'lightblue'}}
                    disabled={props.filter === "All"}>
                All
            </Button>
            <Button onClick={onActiveClickHandler} variant="contained" style={{background: 'lightblue'}}
                    disabled={props.filter === "Active"}>
                Active
            </Button>
            <Button onClick={onCompletedClickHandler} variant="contained" style={{background: 'lightblue'}}
                    disabled={props.filter === "Completed"}>
                Completed
            </Button>
            {/*<Button className={props.filter === "All" ? 'active' : ''} callBack={onAllClickHandler}*/}
            {/*        title={'All'}*/}
            {/*        todoListID={props.todoListID}*/}

            {/*/>*/}
            {/*<Button className={props.filter === "Active" ? 'active' : ''} callBack={onActiveClickHandler}*/}
            {/*        title={'Active'}*/}
            {/*        todoListID={props.todoListID}/>*/}
            {/*<Button className={props.filter === "Completed" ? 'active' : ''} callBack={onCompletedClickHandler}*/}
            {/*        title={'Completed'}*/}
            {/*        todoListID={props.todoListID}/>*/}
            {/*<button  onClick={onAllClickHandler}>All</button>*/}
            {/*<button className={props.filter === "Active" ? 'active' : ''} onClick={onActiveClickHandler}>Active</button>*/}
            {/*<button className={props.filter === "Completed" ? 'active' : ''}*/}
            {/*        onClick={onCompletedClickHandler}>Completed*/}
            {/*</button>*/}
        </div>
    </div>
}
