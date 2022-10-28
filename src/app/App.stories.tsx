import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import App from "./App";
import {ReduxStoreProviderDecorator} from "../ReduxStoreProviderDecorator";
import {combineReducers} from "redux";
import {tasksReducer} from "../features/TodoListsList/Todolist/Task/tasks-reducer";
import {todoListReducer} from "../features/TodoListsList/Todolist/todolists-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListReducer
})
export type AppRootStateType = ReturnType<typeof rootReducer>

export default {
  title: 'TODOLIST/App',
  component: App,
  decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof App> = () => <App demo={true}/> ; // образец

export const AppWithReduxStory = Template.bind({}); // истории созданные на основании нашего образца
// More on args: https://storybook.js.org/docs/react/writing-stories/args

AppWithReduxStory.args = {

};

