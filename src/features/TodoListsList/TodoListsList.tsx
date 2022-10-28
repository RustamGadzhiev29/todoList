import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppSelector, useTypedDispatch} from "../../app/store";
import {TodoListType} from "../../trash/AppWithReducer";
import {creatTodolistTC, setTodolistsTC} from "./Todolist/todolists-reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";

type TodoListsListPropsType = {
    demo?: boolean
}

export const TodoListsList: React.FC<TodoListsListPropsType> = ({demo = false}) => {
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const dispatch = useTypedDispatch()
    const isLoggedIn = useAppSelector(state=>state.auth.isLoggedIn)

    const addTodoList = useCallback((newTodoListTitle: string) => {
        const action = creatTodolistTC(newTodoListTitle)
        dispatch(action)
    }, [dispatch])

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        dispatch(setTodolistsTC())
    }, [])

    if (!isLoggedIn) {
        return <Navigate to = {'/Login'}/>
    }

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm callBack={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {todoLists.map((tl) => {
                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    key={tl.id}
                                    todoListID={tl.id}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })
                }
            </Grid>
        </>)
}
