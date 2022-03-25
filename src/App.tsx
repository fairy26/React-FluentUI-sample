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

    const [isMale, setIsMale] = useState(true);

    const changeSex = () => {
        setIsMale(!isMale);
    };

    return (
        <Stack
            horizontalAlign="center"
            verticalAlign="center"
            verticalFill
            styles={stackStyles}
            tokens={stackTokens}
        >
            <Text variant="xxLarge">
                吉田（{isMale ? '男' : '女'}）：所持金{count * 100}円
            </Text>
            <PrimaryButton text="+" onClick={changeCount} />
            <DefaultButton text="Reset" onClick={resetCount} />

            <PrimaryButton text="性転換" onClick={changeSex} />
        </Stack>
    );
};
