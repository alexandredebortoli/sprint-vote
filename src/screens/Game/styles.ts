import styled, { css } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(props) => props.theme.COLORS.GRAY_600};
    padding: 24px;
`;

export const ContentBottom = styled.View`
    margin-left: -24px;
    margin-right: -24px;
    margin-bottom: -24px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_400};

    padding: 18px 24px;
    justify-content: center;
    align-items: center;
`;

export const SelectionTitle = styled.Text`
    width: 100%;
    text-align: center;
    margin-bottom: 16px;

    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.LG}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
        color: ${theme.COLORS.WHITE};
    `};
`;
