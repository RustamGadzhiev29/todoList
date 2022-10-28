import {AddTodoListACType, ChangeTodolistEntityStatusAC, RemoveTodoListACType} from "../todolists-reducer";
import {TodoListType} from "../../../../trash/AppWithReducer";
import {AppRootStateType, TypedDispatch} from "../../../../app/store";
import {
    DomainTaskType,
    TaskPriorities,
    TasksApi,
    TaskStatuses, TasksType, TaskType,
    UpdateTaskModelType
} from "../../../../api/tasks-api";
import {RequestStatusType, setAppStatusAC} from "../../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";

const initialState: TasksStateType = {}

export type TasksStateType = {
    [key: string]: DomainTaskType[]
}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerACType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASKS": {
            return {
                ...state, [action.payload.todoListID]:
                    state[action.payload.todoListID].filter(t => (t.id !== action.payload.id))
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.task.todoListId]: [{
                    id: action.payload.task.id,
                    description: action.payload.task.description,
                    title: action.payload.task.title,
                    completed: action.payload.task.completed,
                    status: action.payload.task.status,
                    deadline: action.payload.task.deadline,
                    entityStatus: 'idle',
                    addedDate: action.payload.task.addedDate,
                    order: action.payload.task.order,
                    priority: action.payload.task.priority,
                    startDate: action.payload.task.startDate,
                    todoListId: action.payload.task.todoListId
                },
                    ...state[action.payload.task.todoListId],
                ]
            };
        }

        case "UPDATE-TASKS-STATUS": {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(t => t.id === action.payload.id ? {
                    ...t,
                    ...action.payload.domainModel
                } : t)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state, [action.payload.todolist.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let newState = {...state}
            delete newState[action.payload.id]
            return newState

        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.payload.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            return {
                ...state, [action.payload.todolistId]: action.payload.tasks.map((t) => {
                    return {...t, entityStatus: "idle"}
                })
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].map((t) => {
                    return t.id === action.payload.taskID ? {...t, entityStatus: action.payload.status} : t
                })
            }
        }

        default:
            return state
    }
}

//type
type TasksReducerACType =
    RemoveTasksACType
    | AddTaskACType
    | ChangeTaskACType
    | AddTodoListACType
    | RemoveTodoListACType
    | UpdateTasksStatusACType
    | SetTodolistsACType
    | SetTasksACType
    | ChangeTaskStatusACType


export type RemoveTasksACType = ReturnType<typeof RemoveTasksAC>
type AddTaskACType = ReturnType<typeof AddTaskAC>
type ChangeTaskACType = ReturnType<typeof UpdateTasksStatusAC>
type UpdateTasksStatusACType = ReturnType<typeof UpdateTasksStatusAC>
type SetTodolistsACType = ReturnType<typeof SetTodolistsAC>
type SetTasksACType = ReturnType<typeof SetTodolistsTasksAC>
type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskEntityStatusAC>

// actions
export const RemoveTasksAC = (taskID: string, tdID: string) => {
    return {
        type: 'REMOVE-TASKS',
        payload: {
            id: taskID,
            todoListID: tdID
        }
    } as const
}
export const AddTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task
        }
    } as const
}
export const UpdateTasksStatusAC = (taskID: string, domainModel: UpdateDomainTaskModelType, todoListID: string) => {
    return {
        type: 'UPDATE-TASKS-STATUS',
        payload: {
            id: taskID,
            domainModel: domainModel,
            todoListID: todoListID
        }
    } as const
}
export const SetTodolistsAC = (todolists: Array<TodoListType>) => {
    return {
        type: 'SET-TODOLISTS',

        payload: {
            todolists
        }
    } as const
}
export const SetTodolistsTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todolistId,
            tasks
        }
    } as const
}
export const ChangeTaskEntityStatusAC = (todolistId: string, taskID: string, status: RequestStatusType) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId,
            taskID,
            status
        }
    } as const
}

// thunk
export const setTasksTC = (todolistId: string) => {
    return (dispatch: TypedDispatch) => {
        dispatch(setAppStatusAC("loading"));
        TasksApi.getTasks(todolistId).then(res => {
            dispatch(SetTodolistsTasksAC(todolistId, res.data.items));
            dispatch(setAppStatusAC("succeeded"));
        })
    }
}

export const deleteTasksTC = (taskId: string, todolistId: string) => {
    return (dispatch: TypedDispatch) => {
        dispatch(setAppStatusAC("loading"));
        dispatch(ChangeTaskEntityStatusAC(todolistId, taskId, 'loading'))
        TasksApi.deleteTask(taskId, todolistId).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(RemoveTasksAC(taskId, todolistId));
                dispatch(setAppStatusAC("succeeded"));
            } else {

            }
        })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: TypedDispatch) => {
        dispatch(setAppStatusAC("loading"));
        TasksApi.createTask(todolistId, title).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(AddTaskAC(res.data.data.item));
                dispatch(setAppStatusAC("succeeded"));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
        const allTasksFormState = getState().tasks
        const tasksForCurrentTodolist = allTasksFormState[todolistId].find(t => t.id === taskId)
        if (tasksForCurrentTodolist) {
            const apiModelTask: UpdateTaskModelType = {
                deadline: tasksForCurrentTodolist.deadline,
                description: tasksForCurrentTodolist.description,
                title: tasksForCurrentTodolist.title,
                startDate: tasksForCurrentTodolist.startDate,
                priority: tasksForCurrentTodolist.priority,
                status: tasksForCurrentTodolist.status,
                ...domainModel
            }
            dispatch(setAppStatusAC("loading"));
            TasksApi.updateTask(todolistId, taskId, apiModelTask).then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(UpdateTasksStatusAC(taskId, domainModel, todolistId));
                    dispatch(setAppStatusAC("succeeded"));
                } else
                    handleServerAppError(res.data, dispatch)
            })
                .catch((error) => {
                    handleServerNetworkError(error, dispatch)
                })
        }
    }
}



