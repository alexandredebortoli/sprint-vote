import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

type Props = {
    active: boolean;
};

export const Container = styled(TouchableOpacity)<Props>`
    flex: 1;

    min-width: 65px;
    max-width: 65px;

    min-height: 100px;
    max-height: 100px;

    ${({ active, theme }) =>
        active
            ? css`
                  background-color: ${theme.COLORS.BLUE_700};
              `
            : css`
                  border: 2px solid ${theme.COLORS.BLUE_700};
                  background-color: ${theme.COLORS.GRAY_600};
              `}

    border-radius: 6px;

    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text<Props>`
    text-align: center;
    ${({ active, theme }) => css`
        font-size: 34px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
        color: ${active ? theme.COLORS.WHITE : theme.COLORS.BLUE_700};
    `};
`;
