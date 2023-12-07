import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

import { Container } from "./styles";

import Header from "@components/Header";
import Highlight from "@components/Highlight";
import TeamCard from "@components/TeamCard";
import EmptyList from "@components/EmptyList";
import { Button } from "@components/Button";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { TeamsDTO } from "@dtos/teams.dto";
import Loading from "@components/Loading";
import React from "react";

export default function Teams() {
    const [teams, setTeams] = useState<TeamsDTO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    function handleNewTeam() {
        navigation.navigate("newTeam");
    }

    function handleOpenTeam(teamId: string, teamName: string) {
        navigation.navigate("team", { teamId, teamName });
    }

    async function fetchTeams() {
        try {
            setIsLoading(true);
            const response = await api.get("/teams");
            setTeams(response.data as TeamsDTO[]);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const message = isAppError ? error.message : "Unable to get teams.";
            Alert.alert(message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchTeams();
    }, [isFocused]);

    return (
        <Container>
            <Header />

            <Highlight
                title="Teams"
                subtitle="Play with your team"
            />

            {isLoading ? (
                <Loading />
            ) : (
                <FlatList
                    data={teams}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TeamCard
                            title={item.name}
                            onPress={() => handleOpenTeam(item.id, item.name)}
                        />
                    )}
                    contentContainerStyle={teams.length === 0 && { flex: 1 }}
                    ListEmptyComponent={() => (
                        <EmptyList message="👀 What about creating your first team?" />
                    )}
                />
            )}
            <Button
                title="Create new team"
                onPress={handleNewTeam}
            />
        </Container>
    );
}
