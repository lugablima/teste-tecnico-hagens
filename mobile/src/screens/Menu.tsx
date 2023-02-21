import { TouchableOpacity, View } from "react-native";
import { MenuHeader } from "../components/MenuHeader";
import { MenuOption } from "../components/MenuOption";
import { Dimensions } from "react-native";
import { Dispatch, SetStateAction } from "react";

interface MenuProps {
    setShowMenu: Dispatch<SetStateAction<boolean>>;
  }

export function Menu({ setShowMenu }: MenuProps) {
  const SIDEBAR_WIDTH = Dimensions.get("screen").width - 260;  

  return (
    <View className="w-screen h-full flex-1 flex-row absolute top-0 left-0 z-[2]">
      <View className="w-[260] h-full bg-menuBg border-r border-r-black">
        <MenuHeader />
        <MenuOption
          label="Meus dados"
          iconName="person-outline"
          iconSize={24}
          destinationScreen="Home"
        />
        <MenuOption
          label="Editar meus dados"
          iconName="settings-outline"
          iconSize={24}
          destinationScreen="Edit"
        />
        <MenuOption label="Sair" iconName="exit-outline" iconSize={24} />
      </View>
      <TouchableOpacity activeOpacity={0.95} className="h-full bg-black/60" style={{ width: SIDEBAR_WIDTH }} onPress={() => setShowMenu(false)}/>
    </View>
  );
}
