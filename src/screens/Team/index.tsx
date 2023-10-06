import Header from "@components/Header";
import { Container, Form } from "./styles";
import Highlight from "@components/Highlight";
import ButtonIcon from "@components/ButtonIcon";
import Input from "@components/Input";

export default function Team() {
    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title={"Team Name"}
                subtitle="Add members to your team"
            />

            <Form>
                <Input
                    placeholder="Team member username"
                    autoCorrect={false}
                    returnKeyType="done"
                />
                <ButtonIcon icon="add" />
            </Form>
        </Container>
    );
}
