import React from "react"
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./features/TodoListsList/Todolist/Task/tasks-reducer";
import {todoListReducer} from "./features/TodoListsList/Todolist/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "./api/tasks-api";
import thunk from "redux-thunk";
import {appReducer} from "./app/app-reducer";
import {AppRootStateType} from "./app/App.stories";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer,
    app: appReducer
})

const initialGlobalState:AppRootStateType = {
    todolists: [
        {
            id: "todolistId1", title: "What to learn", filter: "All", order: 0,
            addedDate: '', entityStatus: "idle"
        },
        {
            id: "todolistId2", title: "What to buy", filter: "All", order: 0,
            addedDate: '', entityStatus: "idle"
        }
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", completed: true, description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                 entityStatus: "idle"
            },
            {
                id: v1(), title: "JS", completed: true, description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                 entityStatus: "idle"
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", completed: true, description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                 entityStatus: "idle"
            },
            {
                id: v1(), title: "React Book", completed: true, description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                 entityStatus: "idle"
            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}