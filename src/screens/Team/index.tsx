import Header from "@components/Header";
import { Container, Form, HeaderList, NumberOfItems } from "./styles";
import Highlight from "@components/Highlight";
import ButtonIcon from "@components/ButtonIcon";
import Input from "@components/Input";
import { FlatList } from "react-native";
import Filter from "@components/Filter";
import { useState } from "react";
import InfoCard from "@components/InfoCard";
import EmptyList from "@components/EmptyList";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export default function Team() {
    const tabs = ["members", "game history"];

    const [tab, setTab] = useState<string>(tabs[0]);
    const [members, setMembers] = useState<string[]>(["Alexandre"]);
    const [gameHistories, setGameHistories] = useState<string[]>(["Game #2"]);

    const navigation = useNavigation();

    function handleStartGame() {
        navigation.navigate("game");
    }

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
                    {tab === tabs[0] ? members.length : gameHistories.length}
                </NumberOfItems>
            </HeaderList>

            <FlatList
                data={tab === tabs[0] ? members : gameHistories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <InfoCard
                        name={item}
                        icon={tab === tabs[0] ? "person" : "history"}
                        closable={tab === tabs[0] ? true : false}
                        onRemove={() => {}}
                    />
                )}
                ListEmptyComponent={() => (
                    <EmptyList message="There are no members on the team." />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    members.length === 0 && { flex: 1 },
                ]}
            />

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
