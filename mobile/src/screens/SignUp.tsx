import * as yup from "yup";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Form, FormData } from "../components/Form";
import { FormFooter } from "../components/FormFooter";
import Star from "../assets/star.svg";
import { StackProps } from "../../App";

export interface SignUpCredentials {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export function maskPhone(phone: string) {
  return phone
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d)(\d{4})$/, "$1-$2")
    .substring(0, 15);
}

interface HeaderProps {
  text: string;
}

export function Header({ text }: HeaderProps) {
  return (
    <Text className="font-bold text-3xl text-black mt-14 mb-10">{text}</Text>
  );
}

export function StarImage() {
  return (
    <View className="self-end mr-2">
      <Star />
    </View>
  );
}

const phoneRegex = /^\([1-9]{2}\) [1-9]{1}[0-9]{4}\-[0-9]{4}$/;

export const schema = yup.object<SignUpCredentials>({
  name: yup.string().required("Campo obrigatório"),
  phone: yup
    .string()
    .matches(
      phoneRegex,
      "O número de telefone deve seguir o formato (xx) xxxxx-xxxx"
    )
    .required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Campo obrigatório"),
});

export function SignUp() {
  const navigation = useNavigation<StackProps>();

  function handleSignUp(data: SignUpCredentials) {
    console.log(data);
    navigation.navigate("Home");
  }
  
  const formData: FormData<SignUpCredentials> = {
    onSubmit: handleSignUp,
    inputs: [
      {
        label: "Nome completo",
        controllerName: "name",
        placeholder: "Digite seu nome completo",
        maxLength: 70,
      },
      {
        label: "Telefone",
        controllerName: "phone",
        placeholder: "(00) 00000-0000",
        maskField: maskPhone,
        maxLength: 15,
        keyboardType: "numeric",
      },
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
          <Header text="Criar conta" />
          <Form<SignUpCredentials> schema={schema} formData={formData} />
          <FormFooter text="Já tem uma conta?" strong="Entrar" onPress={() => navigation.navigate("SignIn")}/>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
