import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

type Props = TouchableOpacityProps & {
    title: string;
    active?: boolean;
};

export function SelectionCard({ title, active = false, ...rest }: Props) {
    return (
        <Container
            active={active}
            {...rest}
        >
            <Title active={active}>{title}</Title>
        </Container>
    );
}
