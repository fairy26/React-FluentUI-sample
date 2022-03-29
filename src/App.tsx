import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
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
    useEffect(() => {
        console.log('App component mounted');
        return () => {
            console.log('App component unmounted');
        };
    }, []);

    const [todos, setTodos] = useState<string[]>([]);
    const [completedTodos, setCompletedTodos] = useState<string[]>([]);
    // const [text, setText] = useState('');

    // const onInputChange = useCallback((_: any, newValue?: string) => {
    //     setText(newValue || '');
    // }, []);

    const [text, onInputChange] = useReducer((_: string, event: any) => event.target.value, '');

    const onClickAdd = useCallback(() => {
        if (text === '') return;
        const newTodos = [...todos, text];
        setTodos(newTodos);
        // setText('');
    }, [text, todos]);

    const done = useCallback(
        (index: number) => (_?: any, checked?: boolean) => {
            if (checked) {
                const newTodos = [...todos];
                newTodos.splice(index, 1);
                const newCompletedTodos = [...completedTodos, todos[index]];
                setTodos(newTodos);
                setCompletedTodos(newCompletedTodos);
            }
        },
        [todos, completedTodos]
    );

    const reset = useCallback(
        (index: number) => (_?: any, checked?: boolean) => {
            if (!checked) {
                const newCompletedTodos = [...completedTodos];
                newCompletedTodos.splice(index, 1);
                const newTodos = [...todos, completedTodos[index]];
                setCompletedTodos(newCompletedTodos);
                setTodos(newTodos);
            }
        },
        [todos, completedTodos]
    );

    const num = useMemo(() => todos.length, [todos]);
    const numCompleted = useMemo(() => completedTodos.length, [completedTodos]);
    const total = useMemo(() => num + numCompleted, [num, numCompleted]);
    useEffect(() => {
        console.log(`登録済み: ${total}`);
    }, [total]);

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
            <Text variant="xLarge">
                {num > 0 ? `${num}個未消化です！` : numCompleted > 0 && '全部消化しました！'}
            </Text>
        </Stack>
    );
};
