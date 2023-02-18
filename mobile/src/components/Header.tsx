import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export function Header() {
    return (
        <View className="w-screen h-16 px-4 flex flex-row items-center bg-black fixed z-10 top-0 left-0">
            <Feather 
                name="menu"
                color="#FFFFFF"
                size={30}
                style={{ flex: 1 }}
            />
            <Text className="font-bold text-3xl text-white">MyAuth</Text>
            <View className="flex-1"/>
        </View>
    );
}