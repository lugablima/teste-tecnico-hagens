import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import uuid from "react-native-uuid";

import { Header } from "../components/Header";
import { ProfileHeader } from "../components/ProfileHeader";
import { Form, FormData } from "../components/Form";
import { maskPhone, schema, SignUpCredentials } from "./SignUp";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackProps } from "../../App";
import { api } from "../config/axios";
import { UserContext, useUserContext } from "../contexts/UserContext";
import { isAxiosError } from "axios";
import { useCallback, useState } from "react";
import { Menu } from "./Menu";

export function Edit() {
  const navigation = useNavigation<StackProps>();
  const { user, setUser, config } = useUserContext() as UserContext;
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useFocusEffect(useCallback(() => {
    setShowMenu(false);
  }, []));

  async function handleEdit(data: SignUpCredentials) {
    try {
      const { data: message } = await api.patch("/users", data, config);

      setUser(data);
      Alert.alert(message);
      navigation.navigate("Home"); 
    } catch (error) {
      if(isAxiosError(error)) Alert.alert(error.response?.data);
    }
  }
  
  const formData: FormData<SignUpCredentials> = {
    onSubmit: handleEdit,
    inputs: [
      {
        id: uuid.v4() as string,
        label: "Nome completo",
        controllerName: "name",
        placeholder: "Digite seu nome completo",
        maxLength: 70,
        defaultValue: user?.name
      },
      {
        id: uuid.v4() as string,
        label: "Telefone",
        controllerName: "phone",
        placeholder: "(00) 00000-0000",
        maskField: maskPhone,
        maxLength: 15,
        keyboardType: "numeric",
        defaultValue: user?.phone
      },
      {
        id: uuid.v4() as string,
        label: "E-mail",
        controllerName: "email",
        placeholder: "exemplo@email.com",
        keyboardType: "email-address",
        autoCapitalize: "none",
        defaultValue: user?.email
      },
      {
        id: uuid.v4() as string,
        label: "Senha",
        controllerName: "password",
        placeholder: "Digite sua nova senha",
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
      <Header setShowMenu={setShowMenu} />
      {showMenu && <Menu setShowMenu={setShowMenu} />}
      <ScrollView keyboardShouldPersistTaps="always" className="mt-16">
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
