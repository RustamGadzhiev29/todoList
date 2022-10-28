import {tasksReducer} from '../features/TodoListsList/Todolist/Task/tasks-reducer';
import {todoListReducer} from '../features/TodoListsList/Todolist/todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer,
    app: appReducer,
    auth: authReducer
})

// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>(); // типизация диспач
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector // типизация useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;