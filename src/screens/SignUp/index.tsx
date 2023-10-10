import AuthHeader from "@components/AuthHeader";
import { Container, Form, FormTitle, ReturnLoginContainer } from "./styles";
import { Button } from "@components/Button";
import Input from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormDataProps = {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirm: string;
};

const signUpSchema = yup.object({
    name: yup.string().required("Name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Minimum 6 characters"),
    password_confirm: yup
        .string()
        .required("Confirm the password")
        .oneOf([yup.ref("password"), null], "Passwords do not match"),
});

export default function SignUp() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema),
    });

    const navigation = useNavigation();

    function handleReturnLogin() {
        navigation.navigate("signIn");
    }

    function handleSignUp(data: FormDataProps) {
        console.log(data);
    }

    return (
        <Container>
            <AuthHeader />
            <Form>
                <FormTitle>Create your account</FormTitle>

                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Name"
                            autoCapitalize="none"
                            style={{ marginBottom: 16 }}
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.name?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Username"
                            autoCapitalize="none"
                            style={{ marginBottom: 16 }}
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.username?.message}
                        />
                    )}
                />
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
                            style={{ marginBottom: 16 }}
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.password?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password_confirm"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Confirm password"
                            secureTextEntry
                            style={{ marginBottom: 16 }}
                            onChangeText={onChange}
                            value={value}
                            onSubmitEditing={handleSubmit(handleSignUp)}
                            returnKeyType="send"
                            errorMessage={errors.password_confirm?.message}
                        />
                    )}
                />

                <Button
                    title="Access"
                    onPress={handleSubmit(handleSignUp)}
                />
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
