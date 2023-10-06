import { Container, Content, Icon } from "./styles";
import Input from "@components/Input";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import { Button } from "@components/Button";

export default function NewTeam() {
    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlight
                    title="New team"
                    subtitle="Create a team to add members"
                />
                <Input placeholder="Team name" />
                <Button
                    title="Create"
                    style={{ marginTop: 20 }}
                />
            </Content>
        </Container>
    );
}
