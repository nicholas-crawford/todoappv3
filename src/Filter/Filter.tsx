import React, {Dispatch, SetStateAction} from 'react';
import FilterOptions from '../types/FilterOptions';
import Text from '../Text/Text';
import './Filter.css'

interface FilterProps {
    children: React.ReactNode;
    onClick: Dispatch<SetStateAction<FilterOptions>>;
    activeFilter: FilterOptions;
    filter: FilterOptions;
}

const Filter = (props: FilterProps) => {
    const {
        children,
        onClick,
        activeFilter,
        filter,
    } = props;

    const classes = activeFilter === filter ? 'Filter Filter--selected' : 'Filter';


    return (
        <Text className={classes} onClick={() => onClick(filter)}>{children}</Text>
    )
}

export default Filter;