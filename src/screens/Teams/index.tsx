import { useState } from "react";
import { FlatList } from "react-native";

import { Container } from "./styles";

import Header from "@components/Header";
import Highlight from "@components/Highlight";
import TeamCard from "@components/TeamCard";
import EmptyList from "@components/EmptyList";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export default function Teams() {
    const [teams, setTeams] = useState<string[]>(["Team 1", "Team 2"]);

    const navigation = useNavigation();

    function handleNewTeam() {
        navigation.navigate("newTeam");
    }

    function handleOpenTeam() {
        navigation.navigate("team");
    }

    return (
        <Container>
            <Header />

            <Highlight
                title="Teams"
                subtitle="Play with your team"
            />

            <FlatList
                data={teams}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TeamCard
                        title={item}
                        onPress={handleOpenTeam}
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
