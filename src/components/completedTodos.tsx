import { Checkbox, Text } from '@fluentui/react';
import React from 'react';
import { useFunctions } from '../App';

export const CompletedTodoLists: React.FC = () => {
    const { completedTodos, reset } = useFunctions();
    return (
        <>
            <Text variant="xxLarge">Done</Text>
            {completedTodos.map((todo, index) => {
                return <Checkbox key={todo + index} label={todo} checked onChange={reset(index)} />;
            })}
        </>
    );
};
