import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

import { Container } from "./styles";

import Header from "@components/Header";
import Highlight from "@components/Highlight";
import TeamCard from "@components/TeamCard";
import EmptyList from "@components/EmptyList";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { TeamsDTO } from "@dtos/teams.dto";

export default function Teams() {
    const [teams, setTeams] = useState<TeamsDTO[]>([]);

    const navigation = useNavigation();

    function handleNewTeam() {
        navigation.navigate("newTeam");
    }

    function handleOpenTeam(teamId: string) {
        navigation.navigate("team", { teamId });
    }

    async function fetchTeams() {
        try {
            const response = await api.get("/teams");
            if (response.data) {
                setTeams(response.data as TeamsDTO[]);
            }
        } catch (error) {
            const isAppError = error instanceof AppError;
            const message = isAppError ? error.message : "Unable to get teams.";
            Alert.alert(message);
        }
    }

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <Container>
            <Header />

            <Highlight
                title="Teams"
                subtitle="Play with your team"
            />

            <FlatList
                data={teams}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TeamCard
                        title={item.name}
                        onPress={() => handleOpenTeam(item.id)}
                    />
                )}
                contentContainerStyle={teams.length === 0 && { flex: 1 }}
                ListEmptyComponent={() => (
                    <EmptyList message="👀 What about creating your first team?" />
                )}
            />

            <Button
                title="Create new team"
                onPress={handleNewTeam}
            />
        </Container>
    );
}
