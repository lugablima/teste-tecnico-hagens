import { StatusBar } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { NavigationContainer, DefaultTheme, Theme } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import Loading from "./src/components/Loading";
import { Entry } from "./src/screens/Entry";
import { SignUp } from "./src/screens/SignUp";
import { SignIn } from "./src/screens/SignIn";
import { Home } from "./src/screens/Home";
import { Edit } from "./src/screens/Edit";

type NavigationStackProps = {
  Entry: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Home: undefined;
  Edit: undefined;
}

export type StackProps = NativeStackNavigationProp<NavigationStackProps>;

DefaultTheme.colors.background = "#FFFFFF";

const { Navigator, Screen } = createNativeStackNavigator<NavigationStackProps>();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <NavigationContainer theme={ DefaultTheme }>
      <Navigator initialRouteName="Entry" screenOptions={{ headerShown: false }}>
        <Screen name="Entry" component={Entry} />
        <Screen name="SignUp" component={SignUp} />
        <Screen name="SignIn" component={SignIn} />
        <Screen name="Home" component={Home} />
        <Screen name="Edit" component={Edit} />
      </Navigator>
      <StatusBar barStyle="light-content" backgroundColor="black" />
    </NavigationContainer>
  );
}
