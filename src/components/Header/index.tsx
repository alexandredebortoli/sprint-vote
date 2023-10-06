import React from "react";
import {
    HeaderButton,
    BackIcon,
    Container,
    ProfileIcon,
    SignOutIcon,
} from "./styles";

type Props = {
    showBackButton?: boolean;
    variant?: "profile" | "signout";
};

export default function Header({
    showBackButton = false,
    variant = "profile",
}: Props) {
    const headerContent = {
        profile: <ProfileIcon />,
        signout: <SignOutIcon />,
    };

    return (
        <Container $singleChild={!showBackButton}>
            {showBackButton && (
                <HeaderButton>
                    <BackIcon />
                </HeaderButton>
            )}
            <HeaderButton>{headerContent[variant]}</HeaderButton>
        </Container>
    );
}
