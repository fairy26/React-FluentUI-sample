import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Stack, Text, IStackTokens, IStackStyles } from '@fluentui/react';
import { TodoLists } from './components/todoLists';
import { CompletedTodoLists } from './components/completedTodos';
import { InputComponent } from './components/inputComponent';

const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
    root: {
        width: '960px',
        margin: '0 auto',
        textAlign: 'center',
        color: '#605e5c',
    },
};

type Values = {
    text: string;
    onClickAdd: () => void;
    onInputChange: (event: any) => void;
    todos: string[];
    done: (index: number) => (event?: any, checkd?: boolean) => void;
    completedTodos: string[];
    reset: (index: number) => (event?: any, checkd?: boolean) => void;
};

const MainContext = createContext({} as Values);
export const useFunctions = () => useContext(MainContext);

export const App: React.FunctionComponent = () => {
    useEffect(() => {
        console.log('App component mounted');

        return () => {
            console.log('App component unmounted');
        };
    }, []);

    const [text, setText] = useState('');
    const [todos, setTodos] = useState<string[]>([]);
    const [completedTodos, setCompletedTodos] = useState<string[]>([]);

    const onInputChange = useCallback((event: any) => {
        const newText = event.target.value;
        setText(newText);
    }, []);

    const onClickAdd = () => {
        if (text === '') {
            return;
        }
        const newTodos = [...todos, text];
        setTodos(newTodos);
        setText('');
    };

    const done = (index: number) => (event?: any, checkd?: boolean) => {
        if (checkd) {
            const newTodos = [...todos];
            newTodos.splice(index, 1);
            setCompletedTodos([...completedTodos, todos[index]]);
            setTodos(newTodos);
        }
    };

    const reset = (index: number) => (event?: any, checkd?: boolean) => {
        if (!checkd) {
            const newCompletedTodos = [...completedTodos];
            newCompletedTodos.splice(index, 1);
            setCompletedTodos(newCompletedTodos);
            setTodos([...todos, completedTodos[index]]);
        }
    };

    const num = useMemo(() => todos.length, [todos]);
    const numCompleted = useMemo(() => completedTodos.length, [completedTodos]);
    const total = useMemo(() => num + numCompleted, [num, numCompleted]);

    useEffect(() => {
        console.log(`Todoリストが更新されました！ 残り:${num}`);
    }, [num]);

    const Message = () => {
        return (
            <Text variant="xLarge">
                {num > 0 ? `${num}個未消化です！` : total > 0 && '全部消化しました！'}
            </Text>
        );
    };

    return (
        <Stack
            horizontalAlign="center"
            verticalAlign="center"
            verticalFill
            styles={stackStyles}
            tokens={stackTokens}
        >
            <MainContext.Provider
                value={{ text, onClickAdd, onInputChange, todos, done, completedTodos, reset }}
            >
                <InputComponent />
                <TodoLists />
                <CompletedTodoLists />
                <Message />
            </MainContext.Provider>
        </Stack>
    );
};
