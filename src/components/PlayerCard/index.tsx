import { Card, Container, Name } from "./styles";

type Props = {
    name: string;
    selected?: boolean;
};

export default function PlayerCard({ name, selected = false }: Props) {
    return (
        <Container>
            <Card $selected={selected} />
            <Name>{name}</Name>
        </Container>
    );
}
