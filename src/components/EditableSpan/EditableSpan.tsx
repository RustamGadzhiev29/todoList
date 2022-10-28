import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
}
export const EditableSpan = React.memo ((props: EditableSpanPropsType) => {
    console.log("EditableSpan")
    const [edit, setEdit] = useState(false)
    let [title, setTitle] = useState(props.title)

    const onChangeHandler =(e: ChangeEvent<HTMLInputElement>) => {
        let newTitle = e.currentTarget.value
        setTitle(newTitle)
    }
    const onClickHandler = () => {
        setEdit(true)
    }
    const onBlurHandler = () => {
        setEdit(false)
        props.callBack(title)
    }

    return (
        edit ?
            <TextField id="outlined-basic" label="Required" variant="outlined" size={"small"} value={title}
                       onChange={onChangeHandler} autoFocus onBlur={onBlurHandler}/>
            : <span onDoubleClick={onClickHandler}>
           {props.title}
       </span>

    );
});

