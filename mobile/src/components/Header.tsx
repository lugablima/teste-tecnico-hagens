import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

export function Header({ setShowMenu }: HeaderProps) {
  return (
    <View className="w-screen h-16 px-4 flex flex-row items-center bg-black absolute z-[1] top-0 left-0">
      <TouchableOpacity activeOpacity={0.7} className="flex-1" onPress={() => setShowMenu(true)}>
        <Feather name="menu" color="#FFFFFF" size={30} />
      </TouchableOpacity>
      <Text className="font-bold text-3xl text-white">MyAuth</Text>
      <View className="flex-1" />
    </View>
  );
}
