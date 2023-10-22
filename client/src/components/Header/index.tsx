import React from "react";
import {
    HeaderButton,
    BackIcon,
    Container,
    ProfileIcon,
    SignOutIcon,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/useAuth";

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

    const { signOut } = useAuth();

    function handleGoBack() {
        goHome ? navigation.navigate("teams") : navigation.goBack();
    }

    function handleProfile() {
        // navigation.navigate("profile");
        console.log("profile page");
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
            <HeaderButton
                // onPress={variant === "signout" ? signOut : handleProfile}
                onPress={signOut}
            >
                {headerContent[variant]}
            </HeaderButton>
        </Container>
    );
}
