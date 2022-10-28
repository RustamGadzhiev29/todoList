import {AddTodoListAC, TodoListDomainType, todoListReducer} from "./todolists-reducer";
import {TasksStateType} from "../../../trash/TodolistWithReducer";
import {tasksReducer} from "./Task/tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListDomainType> = [];

    const action = AddTodoListAC({
        id: "id exists",
        title: "newTodolistTitle",
        addedDate:"",
        order:0
    });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
