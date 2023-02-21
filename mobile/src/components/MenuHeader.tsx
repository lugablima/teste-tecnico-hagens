import { Image, Text, View } from "react-native";

export function MenuHeader() {
  return (
    <View className="w-full bg-transparent items-start gap-y-2 border-b border-b-black py-9 px-5">
      <Image source={require("../assets/woman.png")} className="w-[60] h-[60] rounded-[250] object-cover object-center" />
      <Text className="font-semibold text-xl text-black">Emily Smith</Text>
    </View>
  );
}
