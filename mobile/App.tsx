import { StatusBar } from 'react-native';

import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Loading from './src/components/Loading';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular, 
    Inter_600SemiBold,
    Poppins_700Bold
  });

  if(!fontsLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>MyAuth!</Text>
      <StatusBar barStyle="light-content" backgroundColor="black" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
  }
});
