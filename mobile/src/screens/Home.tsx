import { View } from "react-native";
import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { ProfileHeader } from "../components/ProfileHeader";

export function Home() {
    return (
        <>
            <Header />
            <View className="flex-1 bg-background px-5">
                <ProfileHeader header="Meus dados" />
                <Card label="Nome" content="Seu nome completo"/>
                <Card label="Telefone" content="(xx) xxxxx-xxxx"/>
                <Card label="E-mail" content="meu.email@email.com"/>
            </View>
        </>
    )
}