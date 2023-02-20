import * as yup from "yup";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Form, FormData } from "../components/Form";
import { FormFooter } from "../components/FormFooter";
import { Header, StarImage } from "./SignUp";

interface SignInCredentials {
  email: string;
  password: string;
}

export function SignIn() {
  const phoneRegex = /^\([1-9]{2}\) [1-9]{1}[0-9]{4}\-[0-9]{4}$/;

  const schema = yup.object<SignInCredentials>({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("Campo obrigatório"),
  });

  function handleSignUp(data: SignInCredentials) {
    console.log(data);
  }

  const formData: FormData<SignInCredentials> = {
    onSubmit: handleSignUp,
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
          <FormFooter text="Não tem uma conta?" strong="Criar conta" />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
