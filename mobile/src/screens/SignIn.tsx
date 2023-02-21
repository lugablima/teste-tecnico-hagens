import * as yup from "yup";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Form, FormData } from "../components/Form";
import { FormFooter } from "../components/FormFooter";
import { Header, StarImage } from "./SignUp";
import { StackProps } from "../../App";
import { UserContext, useUserContext } from "../contexts/UserContext";
import { useCallback } from "react";

export interface SignInCredentials {
  email: string;
  password: string;
}

export function SignIn() {
  const navigation = useNavigation<StackProps>();
  const { token, signInUser } = useUserContext() as UserContext;

  useFocusEffect(
    useCallback(() => {
      if (token) {
        navigation.navigate("Home");
      }
    }, [token])
  );

  const schema = yup.object<SignInCredentials>({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("Campo obrigatório"),
  });

  async function handleSignIn(data: SignInCredentials) {
    try {
      await signInUser(data);
      
      navigation.navigate("Home");
    } catch (error) {
      if(error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  const formData: FormData<SignInCredentials> = {
    onSubmit: handleSignIn,
    inputs: [
      {
        label: "E-mail",
        controllerName: "email",
        placeholder: "exemplo@email.com",
        keyboardType: "email-address",
        autoCapitalize: "none",
      },
      {
        label: "Senha",
        controllerName: "password",
        placeholder: "Digite sua senha",
        secureTextEntry: true,
        autoCapitalize: "none",
      },
    ],
    button: {
      buttonStyle: "dark",
      title: "Entrar",
      mt: 20,
      mb: 20,
    },
  };

  return (
    <View className="w-screen flex-1 px-5 pt-12">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <StarImage />
          <Header text="Entrar" />
          <Form<SignInCredentials> schema={schema} formData={formData} />
          <FormFooter
            text="Não tem uma conta?"
            strong="Criar conta"
            onPress={() => navigation.navigate("SignUp")}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
