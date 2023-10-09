import { Card, Container, Name } from "./styles";

type Props = {
    name: string;
};

export default function PlayerCard({ name }: Props) {
    return (
        <Container>
            <Card />
            <Name>{name}</Name>
        </Container>
    );
}
