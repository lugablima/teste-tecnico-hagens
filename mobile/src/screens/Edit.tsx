import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Header } from "../components/Header";
import { ProfileHeader } from "../components/ProfileHeader";
import { Form, FormData } from "../components/Form";
import { maskPhone, schema, SignUpCredentials } from "./SignUp";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../App";

export function Edit() {
  const navigation = useNavigation<StackProps>();

  function handleEdit(data: SignUpCredentials) {
    console.log(data);
    navigation.navigate("Home");
  }
  
  const formData: FormData<SignUpCredentials> = {
    onSubmit: handleEdit,
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
      title: "Salvar",
      mt: 20,
      mb: 20,
    },
  };

  return (
    <>
      <Header />
      <ScrollView keyboardShouldPersistTaps="always">
        <View className="w-screen flex-1 bg-background px-5">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior="position" enabled>
              <ProfileHeader header="Editar meus dados" />
              <Form<SignUpCredentials> schema={schema} formData={formData} />
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </>
  );
}
