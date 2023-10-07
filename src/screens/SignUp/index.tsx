import AuthHeader from "@components/AuthHeader";
import { Container, Form, FormTitle, ReturnLoginContainer } from "./styles";
import { Button } from "@components/Button";
import Input from "@components/Input";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
    const navigation = useNavigation();

    function handleReturnLogin() {
        navigation.navigate("signIn");
    }

    return (
        <Container>
            <AuthHeader />
            <Form>
                <FormTitle>Create your account</FormTitle>

                <Input
                    placeholder="Name"
                    autoCapitalize="none"
                    style={{ marginBottom: 16 }}
                />
                <Input
                    placeholder="Username"
                    autoCapitalize="none"
                    style={{ marginBottom: 16 }}
                />
                <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{ marginBottom: 16 }}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    style={{ marginBottom: 16 }}
                />
                <Input
                    placeholder="Confirm password"
                    secureTextEntry
                    style={{ marginBottom: 32 }}
                />

                <Button title="Access" />
            </Form>

            <ReturnLoginContainer>
                <Button
                    title="Return to login"
                    outline
                    onPress={handleReturnLogin}
                />
            </ReturnLoginContainer>
        </Container>
    );
}
