import React, {Dispatch, SetStateAction} from 'react';
import Text from "../Text/Text";
import {Todo} from "../types/Todo";
import FilterOptions from "../types/FilterOptions";
import Filter from "../Filter/Filter";
import './FilterOptions.css';

interface FooterOptionsProps {
    todosArray: Todo[];
    setCurrentlyActiveFilter: Dispatch<SetStateAction<FilterOptions>>;
    clearCompletedTodos: () => void;
    currentlyActiveFilter: FilterOptions;
    mobile: boolean;
}

const FooterOptions = (props: FooterOptionsProps) => {
    const {
        todosArray,
        setCurrentlyActiveFilter,
        currentlyActiveFilter,
        clearCompletedTodos,
        mobile,
    } = props;

    const getNotCompletedCount = () => {
        return todosArray.filter(todo => !todo.completed).length;
    }

    const clearCompleteClasses = getNotCompletedCount() < todosArray.length ? 'FilterOptions__ClearCompleted' : 'FilterOptions__ClearCompleted FilterOptions__ClearCompleted--hidden';


    const getCompletedText = () => {
        // Todo: Refactor for DRY principles
        return mobile ?
            <Text>{`${getNotCompletedCount()} left`}</Text> :
            <Text>{`${getNotCompletedCount()} items left`}</Text>
    }

    const getClearText = () => {
        // Todo: Refactor for DRY principles
            return mobile ?
                <Text className={clearCompleteClasses} onClick={clearCompletedTodos}>Clear </Text> :
                <Text className={clearCompleteClasses} onClick={clearCompletedTodos}>Clear Completed</Text>
    }

    return (
                <div className='FilterOptions'>
                    <div className='FilterOptions__Filters'>
                        {getCompletedText()}
                        <div className='FilterOptions__StatusFilters'>
                            {Object.values(FilterOptions).map(value =>
                                <Filter onClick={setCurrentlyActiveFilter}
                                        activeFilter={currentlyActiveFilter}
                                        filter={value}>{value}</Filter>
                            )
                            }
                        </div>
                        {getClearText()}
                    </div>
                </div>
    )
}

export default FooterOptions;