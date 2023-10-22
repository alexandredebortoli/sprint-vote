import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(props) => props.theme.COLORS.GRAY_600};

    padding: 24px;
`;

export const Form = styled.View`
    width: 100%;
    background-color: ${(props) => props.theme.COLORS.GRAY_700};

    flex-direction: row;
    justify-content: center;

    border-radius: 6px;
`;

export const HeaderList = styled.View`
    width: 100%;

    flex-direction: row;
    align-items: center;

    margin: 32px 0 12px;
`;

export const NumberOfItems = styled.Text`
    ${(props) => css`
        color: ${props.theme.COLORS.GRAY_200};
        font-family: ${props.theme.FONT_FAMILY.BOLD};
        font-size: ${props.theme.FONT_SIZE.SM}px;
    `}
`;
