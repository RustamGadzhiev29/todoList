import {ActionsType, setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import { Dispatch } from 'redux';
import {CommonResponseDataType} from "../api/todolist-api";


// generic function
export const handleServerAppError = <T>(data: CommonResponseDataType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<ActionsType>