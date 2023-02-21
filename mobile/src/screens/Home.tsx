import { View } from "react-native";
import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { ProfileHeader } from "../components/ProfileHeader";
import { useEffect, useState } from "react";
import { UserContext, useUserContext } from "../contexts/UserContext";
import { Loading } from "../components/Loading";
import { Menu } from "./Menu";

export function Home() {
  const { user, getUserInfos } = useUserContext() as UserContext;
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    if (!user) getUserInfos();
  }, []);

  return (
    <>
      <Header setShowMenu={setShowMenu} />
      {showMenu && <Menu setShowMenu={setShowMenu} />}
      {user ? (
        <View className="flex-1 bg-background px-5 mt-16">
          <ProfileHeader header="Meus dados" />
          <Card label="Nome" content={user.name} />
          <Card label="Telefone" content={user.phone} />
          <Card label="E-mail" content={user.email} />
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
}
