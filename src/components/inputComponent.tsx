import { IStackTokens, PrimaryButton, Stack, Text, TextField } from '@fluentui/react';
import { useFunctions } from '../App';

const stackTokens: IStackTokens = { childrenGap: 15 };

export const InputComponent: React.FC = () => {
    const { text, onInputChange, onClickAdd } = useFunctions();
    return (
        <>
            <Text variant="xxLarge">Add TODO</Text>
            <Stack horizontal tokens={stackTokens} horizontalAlign="center">
                <TextField value={text} onChange={onInputChange} />
                <PrimaryButton text="Add" onClick={onClickAdd} />
            </Stack>
        </>
    );
};
