import {
    AddTodoListAC, ChangeTodolistEntityStatusAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    TodoListDomainType,
    todoListReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterPropsType} from '../../../trash/AppWithReducer';
import {RequestStatusType} from "../../../app/app-reducer";
import {ChangeTaskEntityStatusAC} from "./Task/tasks-reducer";

let todolistID1:string;
let todolistID2:string;

let startState: Array<TodoListDomainType> = []

beforeEach(()=>{
     todolistID1 = v1();
     todolistID2 = v1();

    startState = [
        {id: todolistID1, title: "What to learn", filter: "All", addedDate:'', order:0, entityStatus:"idle"},
        {id: todolistID2, title: "What to buy", filter: "All", addedDate:'', order:0, entityStatus:"idle"}
    ]
})
test('correct todolist should be removed', () => {
    // let todolistID1 = v1();
    // let todolistID2 = v1();
    //
    // const startState: Array<TodoListType> = [
    //     {id: todolistID1, title: "What to learn", filter: "All"},
    //     {id: todolistID2, title: "What to buy", filter: "All"}
    // ]

    const endState = todoListReducer(startState, RemoveTodoListAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New TodolistWithReducer";
    const action = AddTodoListAC({
        id: "id exists",
        title: newTodolistTitle,
        addedDate:"",
        order:0
    });

    const startState: Array<TodoListDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "All",  addedDate:'', order:0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "All",  addedDate:'', order:0, entityStatus: "idle"}
    ]

    const endState = todoListReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New TodolistWithReducer";

    const startState: Array<TodoListDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "All", addedDate:'', order:0, entityStatus:"idle"},
        {id: todolistId2, title: "What to buy", filter: "All",  addedDate:'', order:0, entityStatus:"idle"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todoListReducer(startState, ChangeTodoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterPropsType = "Completed";

    const startState: Array<TodoListDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "All", addedDate:'', order:0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "All", addedDate:'', order:0, entityStatus: "idle"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = todoListReducer(startState, ChangeTodoListFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct status of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newEntityStatus:RequestStatusType  = "loading";

    const startState: Array<TodoListDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "All", addedDate:'', order:0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "All", addedDate:'', order:0, entityStatus: "idle"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-STATUS',
        id: todolistId2,
        entityStatus: newEntityStatus
    };

    const endState = todoListReducer(startState, ChangeTodolistEntityStatusAC(todolistId2, newEntityStatus));

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newEntityStatus);
});



