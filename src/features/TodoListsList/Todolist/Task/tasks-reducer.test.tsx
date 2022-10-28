import {AddTaskAC, UpdateTasksStatusAC, RemoveTasksAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../../../../trash/TodolistWithReducer';
import {AddTodoListAC, RemoveTodoListAC} from "../todolists-reducer";
import {DomainTaskType, TaskPriorities, TaskStatuses} from "../../../../api/tasks-api";

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        "todolistID1": [
            {
                id: "1", title: "CSS", completed: true, description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistID1",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: "2", title: "JS",
                completed: true,
                description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistID1",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: "3", title: "React",
                completed: true,
                description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistID1",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'
            }
        ],
        "todolistID2": [
            {
                id: "1", title: "bread", completed: true, description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistID2",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: "2", title: "milk", completed: true, description: '',
                status: TaskStatuses.New,
                todoListId: "todolistID2",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: "3", title: "tea", completed: true, description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistID2",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = RemoveTasksAC("2", "todolistID2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistID1": [
            {
                id: "1", title: "CSS",
                completed: true,
                description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistID1",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                entityStatus:'idle'
            },
            {
                id: "2", title: "JS",
                completed: true,
                description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistID1",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                entityStatus:'idle'
            },
            {
                id: "3", title: "React",
                completed: true,
                description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistID1",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                entityStatus:'idle'
            }
        ],
        "todolistID2": [
            {
                id: "1", title: "bread", completed: true, description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistID2",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                entityStatus:'idle'
            },
            {
                id: "3", title: "tea", completed: true, description: '',
                status: TaskStatuses.Completed,
                todoListId: "todolistID2",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                entityStatus:'idle'
            }
        ]
    });

});


test('correct task should be added to correct array', () => {
    const action = AddTaskAC({
        id: "id exists",
        title: "juce",
        todoListId: "todolistID2",
        priority: 0,
        addedDate: "",
        startDate: "",
        status: TaskStatuses.New,
        order: 0,
        deadline: "",
        completed: true,
        description: "",
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistID1"].length).toBe(3);
    expect(endState["todolistID2"].length).toBe(4);
    expect(endState["todolistID2"][0].id).toBeDefined();
    expect(endState["todolistID2"][0].title).toBe('juce');
    expect(endState["todolistID2"][0].status).toBe(TaskStatuses.New);
})


test('status of specified task should be changed', () => {
    const action = UpdateTasksStatusAC("2", {status: 2}, "todolistID2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistID1"][1].status).toBe(2);
    expect(endState["todolistID2"][1].status).toBe(2);
});

test('change tasks title', () => {
    const action = UpdateTasksStatusAC("2", {title: "juce"}, "todolistID2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistID1"][1].title).toBe('JS');
    expect(endState["todolistID2"][1].title).toBe('juce');
});

test('new array should be added when new todolist is added', () => {
    const action = AddTodoListAC({
        id: "id exists",
        title: "newTodolistTitle",
        addedDate: "",
        order: 0
    });
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistID1" && k !== "todolistID2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {
    const action = RemoveTodoListAC("todolistID2");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState["todolistID2"]).not.toBeDefined();
});






