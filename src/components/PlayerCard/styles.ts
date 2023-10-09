import styled, { css } from "styled-components/native";

export const Container = styled.View`
    width: 55px;

    align-items: center;
    text-align: center;
`;

export const Card = styled.View<{ $selected: boolean }>`
    width: 55px;
    height: 80px;
    border-radius: 6px;
    background-color: ${({ theme, $selected }) =>
        $selected ? theme.COLORS.BLUE_700 : theme.COLORS.GRAY_300};
    margin-bottom: 8px;
`;

export const Name = styled.Text`
    flex: 1;

    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.XS}px;
        color: ${theme.COLORS.GRAY_200};
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};
`;
