import React, { useState } from 'react';
import {
    Stack,
    Text,
    IStackTokens,
    IStackStyles,
    PrimaryButton,
    TextField,
    Checkbox,
} from '@fluentui/react';

const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
    root: {
        width: '960px',
        margin: '0 auto',
        textAlign: 'center',
        color: '#605e5c',
    },
};

export const App: React.FunctionComponent = () => {
    const [todos, setTodos] = useState<string[]>([]);
    const [completedTodos, setCompletedTodos] = useState<string[]>([]);
    const [text, setText] = useState('');

    const onInputChange = (_: any, newValue?: string) => {
        setText(newValue || '');
    };

    const onClickAdd = () => {
        if (text === '') return;
        const newTodos = [...todos, text];
        setTodos(newTodos);
        setText('');
    };

    const done = (index: number) => (_?: any, checked?: boolean) => {
        if (checked) {
            const newTodos = [...todos];
            newTodos.splice(index, 1);
            const newCompletedTodos = [...completedTodos, todos[index]];
            setTodos(newTodos);
            setCompletedTodos(newCompletedTodos);
        }
    };

    const reset = (index: number) => (_?: any, checked?: boolean) => {
        if (!checked) {
            const newCompletedTodos = [...completedTodos];
            newCompletedTodos.splice(index, 1);
            const newTodos = [...todos, completedTodos[index]];
            setCompletedTodos(newCompletedTodos);
            setTodos(newTodos);
        }
    };

    return (
        <Stack
            horizontalAlign="center"
            verticalAlign="center"
            verticalFill
            styles={stackStyles}
            tokens={stackTokens}
        >
            <Text variant="xxLarge">Add TODO</Text>
            <Stack horizontal tokens={stackTokens} horizontalAlign="center">
                <TextField value={text} onChange={onInputChange} />
                <PrimaryButton text="Add" onClick={onClickAdd} />
            </Stack>
            <Text variant="xxLarge">TODOs</Text>
            {todos.map((todo, index) => {
                return <Checkbox key={todo + index} label={todo} onChange={done(index)} />;
            })}
            <Text variant="xxLarge">Done</Text>
            {completedTodos.map((todo, index) => {
                return <Checkbox key={todo + index} label={todo} checked onChange={reset(index)} />;
            })}
        </Stack>
    );
};
