import AuthHeader from "@components/AuthHeader";
import {
    Container,
    CreateAccountContainer,
    CreateAccountText,
    Form,
    FormTitle,
} from "./styles";
import { Button } from "@components/Button";
import Input from "@components/Input";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
    const navigation = useNavigation();

    function handleCreateAccount() {
        navigation.navigate("signUp");
    }

    return (
        <Container>
            <AuthHeader />
            <Form>
                <FormTitle>Access your account</FormTitle>

                <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{ marginBottom: 16 }}
                />

                <Input
                    placeholder="Password"
                    secureTextEntry
                    style={{ marginBottom: 32 }}
                />

                <Button title="Access" />
            </Form>

            <CreateAccountContainer>
                <CreateAccountText>Don't have an account?</CreateAccountText>
                <Button
                    title="Create account"
                    outline
                    onPress={handleCreateAccount}
                />
            </CreateAccountContainer>
        </Container>
    );
}
