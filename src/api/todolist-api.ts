import axios, {AxiosResponse} from "axios";
import {TodoListDomainType} from "../features/TodoListsList/Todolist/todolists-reducer";


const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "9d9825bb-ccb6-4efe-8fcf-e888d69867c3"},
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})

// api
export const TodolistApi = {
    getTodos: () => {
        return instance.get<TodoListDomainType[]>('todo-lists')
    },
    createTodo: (title: string) => {
        return instance.post<CommonResponseDataType<{ item: TodoType }>>('todo-lists', {title: title})
    },
    deleteTodo: (todolistId: string) => {
        return instance.delete<CommonResponseDataType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodo: (todolistId: string, title: string) => {
        return instance.put<CommonResponseDataType<{}>>(`todo-lists/${todolistId}`, {title: title})
    }
}

export const authAPI = {
    login: (data: LoginParamsType) => {
        return instance.post<LoginParamsType, AxiosResponse<CommonResponseDataType<{ userId: string }>>>(`auth/login`, data)
    },
    logout: () => {
        return instance.delete<CommonResponseDataType<{ data: {} }>>(`auth/login`)
    },
    me: () => {
        return instance.get<CommonResponseDataType<{ data: AuthParamsType }>>(`auth/me`)
    }
}

// types
export type UpdateTodoTitleType = {
    todolistId: string
    title: string
}
export type CommonResponseDataType<T> = {
    data: T
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}

export type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
export type AuthParamsType = {
    id: number
    email: string
    login: string
}

export  type responseDataType = {
    userId: number
}
