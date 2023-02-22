import { Text, View } from "react-native";
import Shine from "../assets/shiny-shape.svg";
import { Button } from "../components/Button";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackProps } from "../../App";
import { useCallback } from "react";
import { UserContext, useUserContext } from "../contexts/UserContext";
import { CameraContext, useCameraContext } from "../contexts/CameraContext";

export function Entry() {
    const navigation =  useNavigation<StackProps>();
    const { token } = useUserContext() as UserContext;
    const { hasPermission, requestCameraPermission } = useCameraContext() as CameraContext;

    useFocusEffect(useCallback(() => {
        if(token) {
            navigation.navigate("Home");
        }

        if(hasPermission === null) {
            requestCameraPermission();
        }
    }, [token, hasPermission]));

    return (
        <View className="flex-1 items-center bg-background px-5 pt-32">
            <Shine />
            <Text className="font-bold text-3xl text-black mb-3 mt-[68]">MyAuth</Text>
            <Text className="max-w-xs font-regular text-base text-center text-black/70 mb-[76]">Bem vindo(a) aqui seus dados estão protegidos!</Text>
            <Button buttonStyle="dark" title="Entrar" mb={14} onPress={() => navigation.navigate("SignIn")} />
            <Button buttonStyle="light" title="Criar conta" onPress={() => navigation.navigate("SignUp")} />
        </View>
    );
}