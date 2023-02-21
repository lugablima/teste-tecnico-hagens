import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MenuOptionProps {
  label: string;
  iconName: "person-outline" | "settings-outline" | "exit-outline";
  iconSize: number;
  onPressFunction: (() => void) | (() => Promise<void>);
}

export function MenuOption({
  label,
  iconName,
  iconSize,
  onPressFunction,
}: MenuOptionProps) {

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className="w-full h-14 px-5 bg-transparent flex-row items-center justify-between border-b border-b-black"
      onPress={onPressFunction}
    >
      <Ionicons name={iconName} size={iconSize} />
      <Text className="font-semibold text-sm text-black">{label}</Text>
      <Ionicons name="chevron-forward-outline" size={24} />
    </TouchableOpacity>
  );
}
