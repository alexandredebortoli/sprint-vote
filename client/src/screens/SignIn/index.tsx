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
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "react-native";
import { AppError } from "@utils/AppError";
import { useAuth } from "@hooks/useAuth";
import { useState } from "react";
import Loading from "@components/Loading";

type FormDataProps = {
    email: string;
    password: string;
};

const signInSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
});

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false);

    const { signIn } = useAuth();

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataProps>({
        resolver: yupResolver(signInSchema),
    });

    function handleCreateAccount() {
        navigation.navigate("signUp");
    }

    async function handleSignIn({ email, password }: FormDataProps) {
        try {
            setIsLoading(true);
            await signIn(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const alertMessage = isAppError
                ? error.message
                : "Unable to login. Try again later.";

            setIsLoading(false);

            Alert.alert(alertMessage);
        }
    }

    return (
        <Container>
            <AuthHeader />
            {isLoading ? (
                <Loading />
            ) : (
                <Form>
                    <FormTitle>Access your account</FormTitle>

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={{ marginBottom: 16 }}
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Password"
                                secureTextEntry
                                style={{ marginBottom: 32 }}
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Button
                        title="Access"
                        onPress={handleSubmit(handleSignIn)}
                        disabled={isLoading}
                    />
                </Form>
            )}
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
