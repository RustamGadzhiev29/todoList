import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {CheckBox} from "../../../../components/CheckBox";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import React, {useCallback} from "react";
import {DomainTaskType, TaskStatuses, TaskType} from "../../../../api/tasks-api";


type TaskPropsType = {
    todoListID: string
    task: DomainTaskType
    removeTasks: (id: string, todoListID: string) => void
    onChangeTaskStatusOnClickHandler: (status:TaskStatuses, id: string) => void
    onChangeTaskTitleOnClickHandler: (title: string, id: string) => void

}
export const Task = React.memo((props: TaskPropsType) => {
        const onClickHandler = useCallback(() => {
            props.removeTasks(props.task.id, props.todoListID)
        }, [])
        const onChangeHandler = useCallback((e: boolean) => {
            props.onChangeTaskStatusOnClickHandler(e?TaskStatuses.Completed:TaskStatuses.New, props.task.id)
        }, [])
        const onChangeTaskTitleHandler = useCallback ((title:string) => {
            props.onChangeTaskTitleOnClickHandler(title, props.task.id)
        }, [props.task.id, props.onChangeTaskTitleOnClickHandler, props.todoListID])
        return (
            <li className={props.task.status ? "is-done" : ""}>
                <IconButton aria-label="delete" onClick={onClickHandler} disabled={props.task.entityStatus==='loading'}>
                    <Delete />
                </IconButton>
                <CheckBox
                    checked={props.task.status === TaskStatuses.Completed}
                    callBack={onChangeHandler}/>
                <EditableSpan callBack={onChangeTaskTitleHandler}
                              title={props.task.title}/>
            </li>
        )
    }
)

// export const TaskWithDispatch = React.memo(({task, todoListID}:TaskWithDispatchPropsType) => {
//     const dispatch = useDispatch()
//     const removeTasks = useCallback(() => {
//         dispatch(RemoveTasksAC(task.id, todoListID))
//     }, [dispatch, task.id, todoListID]);
//     const changeTaskStatus = useCallback((e: boolean, id: string) => {
//         dispatch(ChangeTasksStatusAC(id, e, todoListID))
//     }, [todoListID, dispatch]);
//
//     const editTitleTask = useCallback(( title: string, id: string,) => {
//         dispatch(ChangeTaskTitleAC(id, title, todoListID))
//     }, [todoListID,dispatch])
//
//
//
//     return (
//         <li className={task.isDone ? "is-done" : ""}>
//             <IconButton aria-label="delete" onClick={removeTasks}>
//                 <Delete />
//             </IconButton>
//             <CheckBox
//                 checked={task.isDone}
//                 callBack={(e)=> changeTaskStatus(e, task.id)}/>
//             <EditableSpan callBack={(title)=>editTitleTask(title, task.id)}
//                           title={task.title}/>
//         </li>
//     )
// })