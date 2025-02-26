import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SplashScreen } from "./app/screens/SplashScreen";
import { LoginScreen } from "./app/screens/LoginScreen";
import { RegisterScreen } from "./app/screens/RegisterScreen";
import { MainScreen } from "./app/screens/MainScreen";
import { EditProfileScreen } from "./app/screens/EditProfileScreen";
import { SettingsScreen } from "./app/screens/SettingsScreen";
import { FriendsScreen } from "./app/screens/FriendsScreen";
import { ChatScreen } from "./app/screens/ChatScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfileScreen}
                />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Friends" component={FriendsScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
