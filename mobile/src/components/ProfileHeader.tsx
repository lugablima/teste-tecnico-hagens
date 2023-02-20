import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProfileHeaderProps {
    header: string;
}

export function ProfileHeader({ header }: ProfileHeaderProps) {
    return(
        <View className="items-center gap-y-6 mt-6 mb-6">
            <Text className="font-bold text-3xl text-black">{ header }</Text>
            <Ionicons name="md-person-circle" size={150} />
        </View>
    );
}