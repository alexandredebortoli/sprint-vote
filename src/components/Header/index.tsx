import React from "react";
import {
    HeaderButton,
    BackIcon,
    Container,
    ProfileIcon,
    SignOutIcon,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

type Props = {
    showBackButton?: boolean;
    variant?: "profile" | "signout";
    goHome?: boolean;
};

export default function Header({
    showBackButton = false,
    variant = "profile",
    goHome = false,
}: Props) {
    const navigation = useNavigation();

    function handleGoBack() {
        goHome ? navigation.navigate("teams") : navigation.goBack();
    }

    const headerContent = {
        profile: <ProfileIcon />,
        signout: <SignOutIcon />,
    };

    return (
        <Container $singleChild={!showBackButton}>
            {showBackButton && (
                <HeaderButton onPress={handleGoBack}>
                    <BackIcon />
                </HeaderButton>
            )}
            <HeaderButton>{headerContent[variant]}</HeaderButton>
        </Container>
    );
}
