import axios from "axios";
import {RequestStatusType} from "../app/app-reducer";

const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "9d9825bb-ccb6-4efe-8fcf-e888d69867c3"},
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})


export const TasksApi = {

    getTasks: (todolistId: string) => {
        return instance.get<TasksType>(`/todo-lists/${todolistId}/tasks`)
    },

    createTask: (todolistId: string, title: string) => {
        return instance.post<CommonResponseDataType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`,
            {title: title})
    },

    deleteTask: (taskId:string, todolistId:string) => {
        return instance.delete<CommonResponseDataType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask: (todolistId: string,  taskId: string, taskModule:UpdateTaskModelType) => {
        return instance.put<CommonResponseDataType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`,
            taskModule)
    }
}
export type UpdateTaskTitleType = {
    todolistId: string
    taskId: string
    title: string
}
export type DeleteTaskType = {
    todolistId: string
    taskId: string
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type DomainTaskType = TaskType & {
    entityStatus:RequestStatusType
}

export type TasksType = {
    items: TaskType[],
    totalCount: number,
    error: null | string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type CommonResponseDataType<T> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
