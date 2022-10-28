import React, {useEffect, useState} from 'react'
import {TodolistApi} from "../api/todolist-api";
import {TasksApi} from "../api/tasks-api";

export default {
    title: 'API',

}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistApi.getTodos().then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState("")
    const createTodolist = () => {
        return TodolistApi.createTodo(title).then(res => {
            setState(res.data);
        })
    }

    return <div>
        <div> {JSON.stringify(state)}</div>
        <input placeholder={"title"}
               value={title}
               onChange={(e) => {
                   setTitle(e.currentTarget.value)
               }}/>
        <button onClick={createTodolist}>createTodolist</button>
    </div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const deleteTodolist = () => {
        TodolistApi.deleteTodo(todolistId).then(res => {
            setState(res.data.data);
        })
    }
    return <div>
        <div> {JSON.stringify(state)}</div>
        <input placeholder={"todolistId"}
               value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <button onClick={deleteTodolist}>deleteTodolist</button>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const [title, setTodolistTitle] = useState("")

    const updateTodolistTitle = () => {
        return TodolistApi.updateTodo(todolistId, title).then(data => {
            setState(data.data)
        })
    }

    return <div>
        <div> {JSON.stringify(state)}</div>
        <input placeholder={"todolistId"}
               value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <input placeholder={"title"}
               value={title}
               onChange={(e) => {
                   setTodolistTitle(e.currentTarget.value)
               }}/>
        <button onClick={updateTodolistTitle}>updateTodolistTitle</button>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "bbbc296c-d310-4f3d-88f2-e93665014c80"
        TasksApi.getTasks(todolistId).then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreatTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const [title, setTitle] = useState("")


    const createTask = () => {
        return TasksApi.createTask(todolistId, title).then((res) => {
            setState(res.data);
        })
    }

    return <div>
        <div> {JSON.stringify(state)}</div>
        <div>
            <input
                placeholder={"todolistId"}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
            <input placeholder={"title"}
                   value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}
            />
            <button onClick={createTask}>createTask</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const [taskId, setTaskId] = useState("")


    const deleteTask = () => {
        return TasksApi.deleteTask(taskId,
            todolistId).then((res) => {
            setState(res.data);
        })

    }
    return <div>
        <div> {JSON.stringify(state)}</div>
        <div>
            <input
                placeholder={"todolistId"}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
            <input
                placeholder={"taskId"}
                value={taskId}
                onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}/>
            <button onClick={deleteTask}>deleteTask</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const [taskId, setTaskId] = useState("")
    const [title, setTitle] = useState("")

    const updateTask = () => {
        return TasksApi.updateTask( todolistId,
            taskId, state).then((res) => {
            setState(res.data.data.item);
        })
    }

    return <div>
        <div> {JSON.stringify(state)}</div>
        <div>
            <input
                placeholder={"todolistId"}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
            <input
                placeholder={"taskId"}
                value={taskId}
                onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}/>
            <input placeholder={"title"}
                   value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}
            />
            <button onClick={updateTask}>updateTask</button>
        </div>
    </div>
}