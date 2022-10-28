import {TodolistApi, TodoType} from "../../../api/todolist-api";
import {TypedDispatch} from "../../../app/store";
import {RequestStatusType, setAppStatusAC} from "../../../app/app-reducer";
import {handleServerAppError} from "../../../utils/error-utils";

const initialState: Array<TodoListDomainType> = []

export type FilterPropsType = 'All' | 'Active' | 'Completed'
export type TodoListDomainType = TodoType &
    {
        filter: FilterPropsType
        entityStatus: RequestStatusType
    }

export const todoListReducer = (state: Array<TodoListDomainType> = initialState, action: todoListReducerACType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.id);
        case "ADD-TODOLIST":
            return [...state, {
                id: action.payload.todolist.id,
                title: action.payload.todolist.title,
                filter: "All",
                order: action.payload.todolist.order,
                addedDate: action.payload.todolist.addedDate,
                entityStatus: "idle"
            }]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)

        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)

        case "SET-TODOLISTS":
            return action.payload.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'All',
                    entityStatus: 'idle'
                }
            })
        case "CHANGE-TODOLIST-STATUS":
            return state.map(tl => tl.id === action.payload.id ? {...tl, entityStatus: action.payload.status} : tl)

        default:
            return state
    }
}

// type
export type todoListReducerACType =
    ReturnType<typeof RemoveTodoListAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof ChangeTodoListTitleAC>
    | ReturnType<typeof ChangeTodoListFilterAC>
    | ReturnType<typeof SetTodoListsAC>
    | ReturnType<typeof ChangeTodolistEntityStatusAC>


export type RemoveTodoListACType = ReturnType<typeof RemoveTodoListAC>
export type AddTodoListACType = ReturnType<typeof AddTodoListAC>
export type SetTodolistsACType = ReturnType<typeof SetTodoListsAC>

//actions
export const RemoveTodoListAC = (todoListID1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todoListID1
        }
    } as const
}

export const AddTodoListAC = (todolist: TodoType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolist
        }
    } as const
}

export const ChangeTodoListTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistId,
            title: newTodolistTitle
        }
    } as const
}

export const ChangeTodoListFilterAC = (id: string, filter: FilterPropsType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
}

export const SetTodoListsAC = (todolists: Array<TodoListDomainType>) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const
}
export const ChangeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
    return {
        type: 'CHANGE-TODOLIST-STATUS',
        payload: {
            id,
            status
        }
    } as const

}

// thunk
export const setTodolistsTC = () => {
    return (dispatch: TypedDispatch) => {
        dispatch(setAppStatusAC("loading"))
        TodolistApi.getTodos().then(res => {
            dispatch(SetTodoListsAC(res.data));
            dispatch(setAppStatusAC("succeeded"))
        })
    }
}

export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: TypedDispatch) => {
        dispatch(setAppStatusAC("loading"));
        dispatch(ChangeTodolistEntityStatusAC(todolistId, 'loading'))
        TodolistApi.deleteTodo(todolistId).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(RemoveTodoListAC(todolistId));
                dispatch(setAppStatusAC("succeeded"));
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(ChangeTodolistEntityStatusAC(todolistId, 'failed'))
            }
        })
    }
}

export const creatTodolistTC = (title: string) => {
    return (dispatch: TypedDispatch) => {
        dispatch(setAppStatusAC("loading"));
        TodolistApi.createTodo(title).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(AddTodoListAC(res.data.data.item));
                dispatch(setAppStatusAC("succeeded"));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: TypedDispatch) => {
        dispatch(setAppStatusAC("loading"));
        TodolistApi.updateTodo(todolistId, title).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(ChangeTodoListTitleAC(todolistId, title));
                dispatch(setAppStatusAC("succeeded"));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
    }
}