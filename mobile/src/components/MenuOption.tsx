import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { StackProps } from "../../App";

interface MenuOptionProps {
  label: string;
  iconName: "person-outline" | "settings-outline" | "exit-outline";
  iconSize: number;
  destinationScreen?: "Home" | "Edit";
}

export function MenuOption({
  label,
  iconName,
  iconSize,
  destinationScreen,
}: MenuOptionProps) {
  const navigation = useNavigation<StackProps>();
  const destinationFunction =
    destinationScreen && (() => navigation.navigate(destinationScreen));

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className="w-full h-14 px-5 bg-transparent flex-row items-center justify-between border-b border-b-black"
      onPress={destinationFunction}
    >
      <Ionicons name={iconName} size={iconSize} />
      <Text className="font-semibold text-sm text-black">{label}</Text>
      <Ionicons name="chevron-forward-outline" size={24} />
    </TouchableOpacity>
  );
}
