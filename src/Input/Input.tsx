import React, {ChangeEvent} from 'react';
import './Input.css';
import Checkbox from '@mui/material/Checkbox';
import {Todo} from "../types/Todo";
interface InputProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    onEnterPressed: () => void,
    value: string,
    onCheckboxClick: () => void,
    todoList: Array<Todo>,
}

const Input = (props: InputProps) => {
    const {
      onChange,
      onEnterPressed,
      onCheckboxClick,
      value,
      todoList,
    } = props;

    const checkForEnter = (key: string) => {
        if (key === 'Enter') {
            onEnterPressed()
        }
    }

    const checkTodoListCompletionStatus = () => {
       return todoList.length > 0 && todoList.every(todo => todo.completed)
    }

    const checkTodoListIndeterminateStatus = () => {
       return todoList.length > 0 && !checkTodoListCompletionStatus() && todoList.some(todo => todo.completed)
    }

    const boxStyle = {display: 'flex'}

 return (
     <div style={boxStyle}>
         <Checkbox onChange={onCheckboxClick} checked={checkTodoListCompletionStatus()} indeterminate={checkTodoListIndeterminateStatus()}/>
         <input className='Input'
             onChange={onChange}
             placeholder='What needs to be done?'
             value={value}
             onKeyDown={(event) => checkForEnter(event.key)}
         />
     </div>
    )
}

export default Input;