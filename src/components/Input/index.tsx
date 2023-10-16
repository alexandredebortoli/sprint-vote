import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { Container, CustomInput, ErrorMessage } from "./styles";

type Props = TextInputProps & {
    inputRef?: React.RefObject<TextInput>;
    errorMessage?: string | null;
};

export default function Input({
    errorMessage = null,
    inputRef,
    ...rest
}: Props) {
    const theme = useTheme();

    const isInvalid = !!errorMessage;

    return isInvalid ? (
        <Container {...rest}>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <CustomInput
                ref={inputRef}
                placeholderTextColor={theme.COLORS.GRAY_300}
                {...rest}
                $isInvalid={isInvalid}
            />
        </Container>
    ) : (
        <CustomInput
            ref={inputRef}
            placeholderTextColor={theme.COLORS.GRAY_300}
            {...rest}
            $isInvalid={isInvalid}
        />
    );
}
