import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    min-height: 74px;
    max-height: 74px;
    align-content: center;
`;

export const CustomInput = styled(TextInput)<{ $isInvalid: boolean }>`
    flex: 1;

    min-height: 56px;
    max-height: 56px;

    ${({ theme, $isInvalid }) => css`
        background-color: ${theme.COLORS.GRAY_700};
        color: ${theme.COLORS.WHITE};
        font-size: ${theme.FONT_SIZE.MD}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
        border: 1px solid
            ${$isInvalid ? theme.COLORS.RED : theme.COLORS.GRAY_700};
    `};

    border-radius: 6px;
    padding: 16px;
`;

export const ErrorMessage = styled.Text`
    width: 100%;
    ${({ theme }) => css`
        color: ${theme.COLORS.RED};
        font-size: ${theme.FONT_SIZE.XS}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};
    padding-bottom: 6px;
    padding-left: 6px;
`;
