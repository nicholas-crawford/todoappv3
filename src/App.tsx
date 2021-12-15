import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { withSize } from 'react-sizeme';
import { Todo } from "./types/Todo";
import FilterOptions from './types/FilterOptions'
import Input from './Input/Input';
import TodoItem from './TodoItem/TodoItem';
import FooterOptions from "./FooterOptions/FooterOptions";
import './App.css';

interface AppProps {
    size: {
        width: number
    };
}

const App = (props: AppProps) => {
    const {
        size,
    } = props;

    const {width} = size;

    const [todoText, setTodoText] = useState('');
    const [currentlyActiveFilter, setCurrentlyActiveFilter] = useState(FilterOptions.ALL);
    const [todos, setTodos]  = useState<Todo[]>([]);

    const addTodo = () => {
        if (todoText.trim() !== '') {
            const newTodo = {
                text: todoText,
                uuid: uuidv4(),
                completed: false,
            }
            const updatedTodos = todos.concat([newTodo])
            setTodos(updatedTodos);
            setTodoText('')
        }
    }
    const deleteTodo = (id: string) => {
        const removedTodo  = todos.filter(todo => todo.uuid !== id)
        setTodos(removedTodo);
    }

    const getTodosList = () => {
       if (currentlyActiveFilter === 'Active') {
            return todos.filter(todo => !todo.completed)
       }

       if (currentlyActiveFilter === 'Completed') {
            return todos.filter(todo => todo.completed)
       }

       return todos
    }

    const toggleCompleteTodo = (id: string) => {
        const completedTodo = todos.map(todo => {
            if (todo.uuid === id) {
                todo.completed = !todo.completed;
            }

            return todo;
        })
        setTodos(completedTodo);
    }

    const clearCompletedTodos = () => {
        setTodos(todos.filter(todo => !todo.completed));
    }

    const toggleAllTodos = () => {
        const allTodosCompleted = todos.every(todo => todo.completed)
        todos.forEach((todo) => {
            if (allTodosCompleted) {
                toggleCompleteTodo(todo.uuid)
            }
            else {
                if (!todo.completed){
                    toggleCompleteTodo(todo.uuid)
                }
            }

        });
    }

    return (
    <div className="App">
        <div className="App__Content">
            <h1 className="App__Heading">todos</h1>
            <Input
                onChange={(event) => setTodoText(event.target.value)}
                onEnterPressed={() => addTodo()}
                value={todoText}
                onCheckboxClick={toggleAllTodos}
                todoList={todos}
            />
            {getTodosList().map((todo: Todo) => {
                return <TodoItem key={todo.uuid}
                                 theTodo={todo}
                                 onDelete={() => deleteTodo(todo.uuid)}
                                 onComplete={() => toggleCompleteTodo(todo.uuid)}/>
            })
            }
            <FooterOptions todosArray={todos} setCurrentlyActiveFilter={setCurrentlyActiveFilter} clearCompletedTodos={clearCompletedTodos} currentlyActiveFilter={currentlyActiveFilter} mobile={width < 760}/>
        </div>
    </div>
  );
}

export default withSize({ monitorHeight: true }) (App);
