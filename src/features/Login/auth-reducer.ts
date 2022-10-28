import {Dispatch} from "redux"
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {authAPI, LoginParamsType} from "../../api/todolist-api";

const initialState = {
    isLoggedIn: false
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        default:
            return state
    }
}

// type


export type  ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setAppStatusAC>

//actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        payload: {
            isLoggedIn: isLoggedIn
        }
    } as const
}
// thunk

export const loginTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.login(data).then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true));
                    dispatch(setAppStatusAC("succeeded"));
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
