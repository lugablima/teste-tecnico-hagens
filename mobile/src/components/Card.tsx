import { Text, View } from "react-native";

interface CardProps {
    label: string;
    content: string;
}

export function Card({ label, content }: CardProps) {
    return (
        <View className="w-full max-w-sm flex flex-col gap-y-1 mb-5 self-center">
            <Text className="font-semibold text-sm text-black self-start">{label}</Text>
            <View className="w-full h-14 p-4 bg-background border border-solid border-black rounded-lg">
                <Text className="font-regular text-base text-black text-center">{content}</Text>
            </View>
        </View>
    );
}