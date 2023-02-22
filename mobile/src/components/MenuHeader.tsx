import { Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { UserContext, useUserContext } from "../contexts/UserContext";

export function MenuHeader() {
  const { user } = useUserContext() as UserContext;

  return (
    <View className="w-full bg-transparent items-start gap-y-2 border-b border-b-black py-9 px-5">
      { user?.image ? <Image source={{ uri: `data:${user.image.type};base64,${user.image.data}` }} className="w-[60] h-[60] rounded-full object-cover object-center" /> : <Ionicons name="md-person-circle" size={60} />}
      <Text className="font-semibold text-xl text-black">{user?.name}</Text>
    </View>
  );
}
