import React from "react";
import { Container, Logo } from "./styles";
import logoImg from "@assets/logoWithName.png";

export default function AuthHeader() {
    return (
        <Container>
            <Logo source={logoImg} />
        </Container>
    );
}
