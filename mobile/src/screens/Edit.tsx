import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import * as yup from "yup";

import { Header } from "../components/Header";
import { ProfileHeader } from "../components/ProfileHeader";
import { Form, FormData } from "../components/Form";
import { maskPhone, phoneRegex, SignUpCredentials } from "./SignUp";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackProps } from "../../App";
import { api } from "../config/axios";
import { UserContext, useUserContext } from "../contexts/UserContext";
import { isAxiosError } from "axios";
import { useCallback, useState } from "react";
import { Menu } from "./Menu";
import { clearBlankAttributes } from "../utils/clearBlankAttributes";
import { CameraContext, useCameraContext } from "../contexts/CameraContext";
import { ExpoCamera } from "../components/ExpoCamera";

export function Edit() {
  const navigation = useNavigation<StackProps>();
  const { user, config } = useUserContext() as UserContext;
  const { hasPermission, openCamera } = useCameraContext() as CameraContext;
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setShowMenu(false);
    }, [])
  );

  const schema = yup.object<SignUpCredentials>({
    name: yup.string().trim(),
    phone: yup
      .string()
      .matches(
        phoneRegex,
        "O número de telefone deve seguir o formato (xx) xxxxx-xxxx"
      ),
    email: yup.string().email("E-mail inválido"),
    password: yup.string().trim().min(6, "A senha deve ter no mínimo 6 caracteres"),
  });

  async function handleEdit(data: SignUpCredentials) {
    try {
      data = clearBlankAttributes<SignUpCredentials>(data);
      
      const { data: message } = await api.patch("/users", data, config);

      Alert.alert(message);
      navigation.navigate("Home");
    } catch (error) {
      if (isAxiosError(error)) {
        if(error.response?.status === 400) Alert.alert("Preencha pelo menos um campo");
        else Alert.alert(error.response?.data);
      }
    }
  }

  const formData: FormData<SignUpCredentials> = {
    onSubmit: handleEdit,
    inputs: [
      {
        id: uuid.v4() as string,
        label: "Nome completo",
        controllerName: "name",
        placeholder: user?.name,
        maxLength: 70,
      },
      {
        id: uuid.v4() as string,
        label: "Telefone",
        controllerName: "phone",
        placeholder: user?.phone,
        maskField: maskPhone,
        maxLength: 15,
        keyboardType: "numeric",
      },
      {
        id: uuid.v4() as string,
        label: "E-mail",
        controllerName: "email",
        placeholder: user?.email,
        keyboardType: "email-address",
        autoCapitalize: "none",
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
      {(hasPermission && openCamera) && <ExpoCamera />}
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
