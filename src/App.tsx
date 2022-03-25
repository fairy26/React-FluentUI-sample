import React, { useState } from 'react';
import {
    Stack,
    Text,
    IStackTokens,
    IStackStyles,
    PrimaryButton,
    DefaultButton,
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
    const [count, setCount] = useState(0);

    const changeCount = () => {
        setCount(count + 1);
    };

    const resetCount = () => {
        setCount(0);
    };

    return (
        <Stack
            horizontalAlign="center"
            verticalAlign="center"
            verticalFill
            styles={stackStyles}
            tokens={stackTokens}
        >
            <Text variant="xxLarge">{count}</Text>
            <PrimaryButton text="+" onClick={changeCount} />
            <DefaultButton text="Reset" onClick={resetCount} />
        </Stack>
    );
};
