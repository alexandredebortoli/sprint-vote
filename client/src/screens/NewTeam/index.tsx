import { Container, Content, Icon } from "./styles";
import Input from "@components/Input";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";
import Loading from "@components/Loading";

export default function NewTeam() {
    const navigation = useNavigation();
    const [newTeamName, setNewTeamName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleCreateTeam() {
        try {
            setIsLoading(true);
            const response = await api.post("/teams", { name: newTeamName });
            navigation.navigate("team", {
                teamId: response.data.id,
                teamName: response.data.name,
            });
        } catch (error) {
            const isAppError = error instanceof AppError;
            const message = isAppError
                ? error.message
                : "Unable to create team.";
            Alert.alert(message);
        } finally {
            setIsLoading(false);
        }
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
                <Input
                    placeholder="Team name"
                    onChangeText={setNewTeamName}
                />
                {isLoading ? (
                    <Loading />
                ) : (
                    <Button
                        title="Create"
                        style={{ marginTop: 20 }}
                        onPress={handleCreateTeam}
                    />
                )}
            </Content>
        </Container>
    );
}
