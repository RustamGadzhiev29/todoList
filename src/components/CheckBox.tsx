import React, {ChangeEvent} from 'react';

type CheckBoxPropsType = {
    callBack:(e:boolean)=>void,
    checked:boolean
}
export const CheckBox = (props:CheckBoxPropsType) => {

const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    props.callBack(e.currentTarget.checked)
}
    return (
            <input type="checkbox"
                   checked={props.checked}
                   onChange={onChange}
            />

    );
};

