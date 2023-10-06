import { Container } from "./styles";

import Header from "@components/Header";
import Highlight from "@components/Highlight";

export default function Teams() {
    return (
        <Container>
            <Header showBackButton />
            <Highlight
                title="Teams"
                subtitle="Play with your team"
            />
        </Container>
    );
}
