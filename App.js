import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} options={styles}/>
        <Stack.Screen name="Pokemon" component={Pokemon} options={styles}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
const styles = {
  headerStyle: {
    backgroundColor: "#282c34",
  },
  headerTintColor: "white",
  headerTitleStyle: "bold",
}