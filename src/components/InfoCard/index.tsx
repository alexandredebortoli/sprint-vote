import ButtonIcon from "@components/ButtonIcon";
import { Container, Icon, Name } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
    name: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    closable?: boolean;
    onRemove: () => void;
};

export default function InfoCard({
    name,
    icon,
    closable = false,
    onRemove,
}: Props) {
    return (
        <Container>
            <Icon name={icon} />
            <Name>{name}</Name>
            {closable && (
                <ButtonIcon
                    icon="close"
                    type="SECONDARY"
                    onPress={onRemove}
                />
            )}
        </Container>
    );
}
