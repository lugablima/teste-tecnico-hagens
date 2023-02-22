import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext, useUserContext } from "../contexts/UserContext";
import { CameraContext, useCameraContext } from "../contexts/CameraContext";

interface ProfileHeaderProps {
    header: string;
}

export function ProfileHeader({ header }: ProfileHeaderProps) { 
    const route = useRoute();
    const { user } = useUserContext() as UserContext; 
    const { setOpenCamera } = useCameraContext() as CameraContext; 
    
    function RenderProfileImage() {
        if(route.name === "Home") {
            if(!user?.image) {
                return <Ionicons name="md-person-circle" size={150} />;
            }
            return <Image source={{ uri: `data:${user.image.type};base64,${user.image.data}`}} className="w-[150] h-[150] rounded-full object-cover object-center" />;
        }

        if(!user?.image) return (<TouchableOpacity activeOpacity={0.7} onPress={() => setOpenCamera(true)} ><Ionicons name="md-person-circle" size={150} /></TouchableOpacity>);

        return (<TouchableOpacity activeOpacity={0.7} onPress={() => setOpenCamera(true)}><Image source={{ uri: `data:${user.image.type};base64,${user.image.data}`}} className="w-[150] h-[150] rounded-full object-cover object-center" /></TouchableOpacity>);
    }

    const profileImage = RenderProfileImage();

    return(
            <View className="items-center gap-y-6 mt-6 mb-6">
                <Text className="font-bold text-3xl text-black">{ header }</Text>
                { profileImage }
            </View>
    );
}