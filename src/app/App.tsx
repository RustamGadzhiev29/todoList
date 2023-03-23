import React, {useEffect} from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar";
import {CircularProgress, Container, LinearProgress} from "@mui/material";
import {TodoListsList} from "../features/TodoListsList/TodoListsList";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppSelector, useTypedDispatch} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {
    Route, Routes, Navigate
} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {initializeAppTC} from "./app-reducer";

type PropsType = {
    demo?: boolean
}


function App({demo = false}: PropsType) {
    console.log("App")
    const status = useSelector<AppRootStateType>((state) => state.app.status)
    const dispatch = useTypedDispatch()
    const isInitialized =  useAppSelector(state=>state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            {status === "loading" && <LinearProgress/>}
            <Container fixed>
                <Routes>
                    <Route path='/todolist' element={<TodoListsList demo={demo}/>}/>
                    <Route path='/' element={<Navigate to='/todolist'/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path='/*' element={<Navigate to='/404'/>}/>
                   
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}


export default App;