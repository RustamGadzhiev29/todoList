import React, {useReducer} from 'react';
import '../app/App.css';
import {TodolistWithReducer} from './TodolistWithReducer';
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import ButtonAppBar from "../components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListReducer
} from "../features/TodoListsList/Todolist/todolists-reducer";
import {
    AddTaskAC,
    RemoveTasksAC,
    tasksReducer,
    UpdateTasksStatusAC
} from "../features/TodoListsList/Todolist/Task/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";

export type FilterPropsType = 'All' | 'Active' | 'Completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterPropsType
}

function AppWithReducer() {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, dispatchTodolist] = useReducer(todoListReducer, [
        {id: todoListID1, title: "What to learn", filter: 'All', order: 0,
            addedDate: '', entityStatus: "idle"},
        {id: todoListID2, title: "What ti buy", filter: 'All',order: 0,
            addedDate: '', entityStatus: "idle"},
    ])

    let [tasks, dispatchTask] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", completed:true, description: '',
                status: TaskStatuses.Completed,
                todoListId: todoListID1,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'},
            {id: v1(), title: "PHP", completed:true, description: '',
                status: TaskStatuses.Completed,
                todoListId: todoListID1,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                entityStatus:'idle'}
        ],
        [todoListID2]: [
            {id: v1(), title: "BOOK", completed:true, description: '',
                status: TaskStatuses.Completed,
                todoListId: todoListID1,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                entityStatus:'idle'},
            {id: v1(), title: "GAMES", completed:true, description: '',
                status: TaskStatuses.Completed,
                todoListId: todoListID1,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'}
        ]
    })
    // let [filter, setFilter] = useState<FilterPropsType>("All")

    const addTodoList = (newTodoListTitle: string) => {
        // let newID = v1()
        // let newTodoList: TodoListType = {
        //     id: newID,
        //     title: newTodoListTitle,
        //     filter: 'All'
        // }
        // setTodoLists([newTodoList, ...todoLists])
        // setTask({...tasks, [newID]: []})
        // const action = AddTodoListAC(newTodoListTitle)
        // dispatchTodolist(action)
        // dispatchTask(action)

    }
    const upDateTodoListTitle = (todoListID: string, title: string) => {
        // setTodoLists(todoLists.map(t => t.id === todoListID ? {...t, title} : t))
        dispatchTodolist(ChangeTodoListTitleAC(todoListID, title))
    }
    const upDateTaskTitle = (todoListID: string, taskID: string, title: string) => {

        // setTask({...tasks, [todoListID]:tasks[todoListID].map(t=> t.id===taskID? {...t, title}:t)})

        dispatchTask(UpdateTasksStatusAC( taskID, {title}, todoListID))
    }
    const removeTodoLists = (todoListID: string) => {
        // setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        // delete tasks[todoListID]
        dispatchTodolist(RemoveTodoListAC(todoListID))
        dispatchTask(RemoveTodoListAC(todoListID))
    }


    const removeTasks = (todoListID: string, id: string) => {
        // setTask({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== id)})
        // // let newTasks = tasks.filter((t) =>
        // //     t.id !== id,
        // // )
        // // setTask(newTasks)
        dispatchTask(RemoveTasksAC(todoListID, id))
    }
    const addTask = (title:string, newTitle: string) => {
        // let newTask = {
        //     id: v1(),
        //     title: newTitle,
        //     isDone: false
        // }
        // setTask({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
        // // let newTask = {
        // //     id: v1(),
        // //     title: newTitle,
        // //     isDone: false
        // // }
        // // setTask([
        // //     ...tasks, newTask
        // // ])

        dispatchTask(AddTaskAC( {
            id: "id exists",
            title: title,
            todoListId: "todolistID2",
            priority: 0,
            addedDate: "",
            startDate: "",
            status: TaskStatuses.New,
            order: 0,
            deadline: "",
            completed: true,
            description: ""
        }))
    }
    const changeFilter = (todoListID: string, value: FilterPropsType) => {
        // setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
        dispatchTodolist(ChangeTodoListFilterAC(todoListID, value ))
        // setFilter(value)
    }
    // let filteredTasks = tasks;
    // if (filter === "Active") {
    //     filteredTasks = tasks.filter(t => t.isDone);
    // }
    // if (filter === "Completed") {
    //     filteredTasks = tasks.filter(t => t.isDone === false);
    // }

    const onChangeTaskStatus = (todoListID: string, taskID: string, status: TaskStatuses) => {
        // setTask({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)})
        // // tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        // // setTask([...tasks])
        dispatchTask(UpdateTasksStatusAC(todoListID,  {status}, taskID))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((tl) => {
                        let filteredTasks = tasks[tl.id];
                        if (tl.filter === "Active") {
                            filteredTasks = tasks[tl.id].filter(t => t.status);
                        }
                        if (tl.filter === "Completed") {
                            filteredTasks = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed);
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodolistWithReducer
                                        key={tl.id}
                                        todoListID={tl.id}
                                        title={tl.title}
                                        tasks={filteredTasks}
                                        removeTasks={removeTasks}
                                        filter={tl.filter}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        onChangeTaskStatus={onChangeTaskStatus}
                                        active={true}
                                        removeTodoLists={removeTodoLists}
                                        upDateTodoListTitle={upDateTodoListTitle}
                                        upDateTaskTitle={upDateTaskTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })

                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;