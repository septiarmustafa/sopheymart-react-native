import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import LoginScreen from "./app/screens/LoginScreen/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./app/navigations/TabNavigation";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RegisterScreen from "./app/screens/RegisterScreen/RegisterScreen";
import ProductDetailScreen from "./app/screens/ProductDetailScreen/ProductDetailScreen";

const Stack = createStackNavigator();

export default function App() {
  const [signedIn, setSignedIn] = React.useState(false);
  const [fontsLoaded, fontError] = useFonts({
    outfit: require("./assets/fonts/Outfit-Regular.ttf"),
    outfit_bold: require("./assets/fonts/Outfit-Bold.ttf"),
    outfit_medium: require("./assets/fonts/Outfit-Medium.ttf"),
  });

  const getIsSignedIn = async () => {
    let isSignedIn = await AsyncStorage.getItem("token");
    setSignedIn(isSignedIn ? true : false);
  };

  React.useEffect(() => {
    console.log();
    getIsSignedIn();
  }, []);
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator>
          {signedIn ? (
            <>
              <Stack.Screen
                name="Tab"
                component={TabNavigation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
