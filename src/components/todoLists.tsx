import React from 'react';
import { Checkbox, Text } from '@fluentui/react';
import { useFunctions } from '../App';

export const TodoLists: React.FC = () => {
    const { todos, done } = useFunctions();
    return (
        <>
            <Text variant="xxLarge">TODOs</Text>
            {todos.map((todo, index) => {
                return <Checkbox key={todo + index} label={todo} onChange={done(index)} />;
            })}
        </>
    );
};
