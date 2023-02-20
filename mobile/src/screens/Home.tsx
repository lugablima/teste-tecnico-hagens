import { View } from "react-native";
import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { ProfileHeader } from "../components/ProfileHeader";
import { useEffect } from "react";
import { UserContext, useUserContext } from "../contexts/UserContext";
import { Loading } from "../components/Loading";

export function Home() {
  const { user, getUserInfos } = useUserContext() as UserContext;

  useEffect(() => {
    if (!user) getUserInfos();
  }, []);

  return (
    <>
      <Header />
      {user ? (
        <View className="flex-1 bg-background px-5">
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
