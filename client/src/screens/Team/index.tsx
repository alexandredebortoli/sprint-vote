import Header from "@components/Header";
import { Container, Form, HeaderList, NumberOfItems } from "./styles";
import Highlight from "@components/Highlight";
import ButtonIcon from "@components/ButtonIcon";
import Input from "@components/Input";
import { Alert, FlatList } from "react-native";
import Filter from "@components/Filter";
import { useEffect, useState } from "react";
import InfoCard from "@components/InfoCard";
import EmptyList from "@components/EmptyList";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { api } from "@services/api";
import { PlayerSummaryDTO } from "@dtos/player-summary.dto";
import { AppError } from "@utils/AppError";
import { GameSummaryDTO } from "@dtos/game-summary.dto";
import Loading from "@components/Loading";
import { useAuth } from "@hooks/useAuth";

type RouteParamsProps = {
    teamId: string;
    teamName: string;
};

export default function Team() {
    const tabs = ["members", "game history"];

    const [tab, setTab] = useState<string>(tabs[0]);
    const [players, setPlayers] = useState<PlayerSummaryDTO[]>([]);
    const [games, setGames] = useState<GameSummaryDTO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigation = useNavigation();

    const route = useRoute();

    const { teamId, teamName = "Team Name" } = route.params as RouteParamsProps;

    // const { token } = useAuth();

    function handleStartGame() {
        navigation.navigate("game");
    }

    async function fetchTeamMembers() {
        try {
            setIsLoading(true);
            const response = await api.get(`/teams/${teamId}/players`);
            setPlayers(response.data as PlayerSummaryDTO[]);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const message = isAppError
                ? error.message
                : "Unable to get members.";
            Alert.alert(message);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchTeamGameHistory() {
        try {
            setIsLoading(true);
            const response = await api.get(`/teams/${teamId}/games`);
            setGames(response.data as GameSummaryDTO[]);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const message = isAppError
                ? error.message
                : "Unable to get game history.";
            Alert.alert(message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchTeamMembers();
        fetchTeamGameHistory();
    }, [teamId]);

    return (
        <Container>
            <Header
                showBackButton
                goHome
            />

            <Highlight
                title={teamName}
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

            <HeaderList>
                <FlatList
                    data={tabs}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === tab}
                            onPress={() => setTab(item)}
                        />
                    )}
                    horizontal
                />
                <NumberOfItems>
                    {tab === tabs[0] ? players.length : games.length}
                </NumberOfItems>
            </HeaderList>

            {isLoading ? (
                <Loading />
            ) : tab === tabs[0] ? (
                <FlatList
                    data={players}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <InfoCard
                            name={
                                item.name.length > 29
                                    ? item.name.substr(0, 29) + "..."
                                    : item.name
                            }
                            icon={"person"}
                            closable
                            onRemove={() => {}}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <EmptyList
                            message={"There are no members on the team."}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        { paddingBottom: 100 },
                        players.length === 0 && { flex: 1 },
                    ]}
                />
            ) : (
                <FlatList
                    data={games}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <InfoCard
                            name={item.name}
                            icon={"history"}
                            onRemove={() => {}}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <EmptyList message={"No games have been played."} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        { paddingBottom: 100 },
                        games.length === 0 && { flex: 1 },
                    ]}
                />
            )}

            <Button
                title="Start game"
                style={{ marginBottom: 16 }}
                onPress={handleStartGame}
            />
            <Button
                title="Team settings"
                outline
            />
        </Container>
    );
}
