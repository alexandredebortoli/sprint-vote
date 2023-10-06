import styled from "styled-components/native";
import { CaretLeft, UserCircle, SignOut } from "phosphor-react-native";

export const Container = styled.View`
    width: 100%;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const HeaderButton = styled.TouchableOpacity``;

export const ProfileIcon = styled(UserCircle).attrs((props) => ({
    size: 36,
    color: props.theme.COLORS.WHITE,
}))``;

export const SignOutIcon = styled(SignOut).attrs((props) => ({
    size: 36,
    color: props.theme.COLORS.WHITE,
}))``;

export const BackIcon = styled(CaretLeft).attrs((props) => ({
    size: 36,
    color: props.theme.COLORS.WHITE,
}))``;
