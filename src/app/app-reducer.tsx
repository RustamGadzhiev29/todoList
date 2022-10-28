import {Dispatch} from "redux"
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {authAPI} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.payload.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    payload: {status}
} as const)

export const setAppErrorAC = (error: null | string) => ({
    type: 'APP/SET-ERROR',
    payload: {error}
} as const)

export const setIsInitializedAC = (isInitialized: boolean) => ({
    type: 'APP/SET-INITIALIZED',
    payload: {isInitialized}
} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(()=> dispatch(setIsInitializedAC(true)))
}

export type ActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>

