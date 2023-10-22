import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type ButtonTypeStyleProps = "PRIMARY" | "SECONDARY";

type Props = {
    type: ButtonTypeStyleProps;
    outline: boolean;
};

export const Container = styled(TouchableOpacity)<Props>`
    flex: 1;

    min-height: 56px;
    max-height: 56px;

    ${({ outline, theme, type }) =>
        outline
            ? css`
                  border: 1px solid
                      ${type === "PRIMARY"
                          ? theme.COLORS.BLUE_700
                          : theme.COLORS.RED_DARK};
              `
            : css`
                  background-color: ${type === "PRIMARY"
                      ? theme.COLORS.BLUE_700
                      : theme.COLORS.RED_DARK};
              `}

    border-radius: 6px;

    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text<Props>`
    ${({ outline, theme, type }) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
        color: ${outline
            ? type === "PRIMARY"
                ? theme.COLORS.BLUE_500
                : theme.COLORS.RED
            : theme.COLORS.WHITE};
    `};
`;
