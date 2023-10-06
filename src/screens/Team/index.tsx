import Header from "@components/Header";
import { Container, Form, HeaderList, NumberOfItems } from "./styles";
import Highlight from "@components/Highlight";
import ButtonIcon from "@components/ButtonIcon";
import Input from "@components/Input";
import { FlatList } from "react-native";
import Filter from "@components/Filter";
import { useState } from "react";

export default function Team() {
    const tabs = ["members", "game history"];

    const [tab, setTab] = useState<string>(tabs[0]);
    const [members, setMembers] = useState<string[]>([]);
    const [gameHistories, setGameHistories] = useState<string[]>([]);

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
        </Container>
    );
}
