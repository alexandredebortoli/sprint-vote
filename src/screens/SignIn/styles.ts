import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(props) => props.theme.COLORS.GRAY_600};

    padding: 24px;

    justify-content: space-between;
`;

export const Form = styled.View`
    width: 100%;
    justify-content: center;
    flex: 12;
`;

export const FormTitle = styled.Text`
    text-align: center;
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.LG}px;
        color: ${theme.COLORS.WHITE};
        font-family: ${theme.FONT_FAMILY.BOLD};
    `};

    margin-bottom: 32px;
`;

export const CreateAccountText = styled.Text`
    text-align: center;
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.SM}px;
        color: ${theme.COLORS.GRAY_100};
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};

    margin-bottom: 16px;
`;

export const CreateAccountContainer = styled.View`
    width: 100%;
    justify-content: flex-end;
    flex: 1;
`;
