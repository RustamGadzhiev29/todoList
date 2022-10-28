import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {RequestStatusType} from "../../app/app-reducer";

type PropsType = {
    callBack: (title: string) => void
    entityStatus?: RequestStatusType
}

export const AddItemForm = React.memo(function (props: PropsType) {
    console.log("AddItemForm")
    let [title, setValue] = useState('')
    let [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let title = e.currentTarget.value
        setValue(title)
        setError(false)

    }
    const onCLickHandler = () => {
        if (title.trim() !== '') {
            props.callBack(title)
        } else {
            setError(true)
        }
        setValue('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onCLickHandler()
            setValue('')
        }
    }

    return (
        <div>
            <TextField id="outlined-basic"
                       label="Required"
                       variant="outlined"
                       size={"small"}
                       value={title}
                       onChange={onChangeHandler}
                       error={error}
                       onKeyPress={onKeyPressHandler}
                       disabled={props.entityStatus === 'loading'}
            />
            <Button variant="contained"
                    style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', background: 'lightblue'}}
                    onClick={onCLickHandler} disabled={props.entityStatus==='loading'}> {'+'}
            </Button>
            {error && <div className={'error-message'}>Title is required</div>}
        </div>
    );
});

