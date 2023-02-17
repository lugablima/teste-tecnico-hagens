import { ActivityIndicator, View } from "react-native";

export default function Loading() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
            <ActivityIndicator color="#000"/>
        </View>
    );
}