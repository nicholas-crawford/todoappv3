import React from 'react';
import { Todo } from "../types/Todo";
import './TodoItem.css';
import CloseIcon from '@mui/icons-material/Close';
import Text from "../Text/Text";
import Checkbox from '@mui/material/Checkbox';

interface TodoProps {
    theTodo: Todo,
    onDelete: () => void,
    onComplete: () => void,
}



const TodoItem = (props: TodoProps) => {
    const {
        theTodo,
        onDelete,
        onComplete,
    } = props;



    const todoCompleted = theTodo.completed ? 'TodoItem__Text TodoItem__Text--completed' : 'TodoItem__Text';

    return (
        <div className='TodoItem'>
            <div className='TodoItem__TextAndToggle'>
                <Checkbox onChange={onComplete} checked={theTodo.completed}/>
                <Text className={todoCompleted}>{theTodo.text}</Text>
            </div>
            <CloseIcon className='TodoItem__Cross' onClick={onDelete} />

        </div>
    )
}

export default TodoItem;
