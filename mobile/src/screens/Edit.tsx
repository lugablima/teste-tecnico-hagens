import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Header } from "../components/Header";
import { ProfileHeader } from "../components/ProfileHeader";
import { Form } from "../components/Form";
import { formData, schema, SignUpCredentials } from "./SignUp";

export function Edit() {
  formData.button.title = "Salvar";

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
