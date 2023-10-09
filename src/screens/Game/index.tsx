import { Container, ContentBottom, SelectionTitle } from "./styles";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import { Button } from "@components/Button";
import { FlatList, View } from "react-native";
import { useState } from "react";
import PlayerCard from "@components/PlayerCard";
import { SelectionCard } from "@components/SelectionCard";

export default function Game() {
    const [players, setPlayers] = useState([
        "Alexandre",
        "Rafael",
        "Sophie",
        "Nicolas",
        "Vini",
        "Saint",
        "João",
        "Ale",
        "Rafael",
        "Sophie",
        "Nicolas",
        "Vini",
        "Saint",
        "João",
    ]);
    const [points, setPoints] = useState(["0", "1", "2", "3", "5", "8", "13"]);
    const [selectedCard, setSelectedCard] = useState<string>();

    const currentUser = "Alexandre";

    function handleCardSelection(value: string) {
        setSelectedCard(value);
    }

    return (
        <Container>
            <Header showBackButton />
            <Highlight
                title="Planning Poker Game"
                subtitle="Game 13 - Voting #12"
            />
            <Button
                title="Reveal cards"
                outline
                style={{ marginBottom: 32 }}
            />
            <FlatList
                data={players}
                keyExtractor={(item) => item}
                numColumns={3}
                renderItem={({ item }) => (
                    <PlayerCard
                        name={item}
                        selected={item === currentUser && selectedCard != null}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                columnWrapperStyle={{ justifyContent: "space-around" }}
                style={{ marginBottom: 16 }}
            />
            <ContentBottom>
                <SelectionTitle>Pick your card!</SelectionTitle>
                <FlatList
                    data={points}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <SelectionCard
                            title={item}
                            active={item === selectedCard}
                            onPress={() => handleCardSelection(item)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                        <View style={{ width: 16 }} />
                    )}
                />
            </ContentBottom>
        </Container>
    );
}
