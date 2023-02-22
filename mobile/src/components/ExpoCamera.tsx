import { Camera, CameraType } from "expo-camera";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { CameraContext, useCameraContext } from "../contexts/CameraContext";
import { User, UserContext, useUserContext } from "../contexts/UserContext";

export function ExpoCamera() {
    const { camRef, type, setType, setOpenCamera } = useCameraContext() as CameraContext;
    const { user, setUser } = useUserContext() as UserContext;

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current?.takePictureAsync({
        base64: true,
        quality: 1,
      });

      setUser({ ...user, image: { name: "default", type: "image/jpg", data: data?.base64 as string } } as User);
      
      setOpenCamera(false);
    }
  }

  return (
    <View className="w-screen h-full flex-1 absolute top-0 left-0 z-[3]">
      <Camera className="flex-1" type={type} ref={camRef} ratio="16:9">
        <View className="flex-1 flex-row bg-transparent">
          <TouchableOpacity
            className="absolute bottom-5 left-5"
            onPress={toggleCameraType}
          >
            <Text className="font-semibold text-xl mb-3 text-white">
              Trocar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="absolute bottom-5 right-5"
            onPress={() => setOpenCamera(false)}
          >
            <Text className="font-semibold text-xl mb-3 text-white">
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View className="justify-center p-5 bg-background">
        <TouchableOpacity className="h-[50] items-center justify-center bg-black rounded-lg" onPress={takePicture}>
            <FontAwesome name="camera" size={23} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
