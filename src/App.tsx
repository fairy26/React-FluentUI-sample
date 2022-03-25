import React from 'react';
import { Stack, Text, IStackTokens, IStackStyles } from '@fluentui/react';

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
    return (
        <Stack
            horizontalAlign="center"
            verticalAlign="center"
            verticalFill
            styles={stackStyles}
            tokens={stackTokens}
        >
            <Text variant="xxLarge">書き換えました</Text>
        </Stack>
    );
};
