import { Container, Content, Icon } from "./styles";
import Input from "@components/Input";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export default function NewTeam() {
    const navigation = useNavigation();

    function handleNew() {
        navigation.navigate("team");
    }
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
                    onPress={handleNew}
                />
            </Content>
        </Container>
    );
}
