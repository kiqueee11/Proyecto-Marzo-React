import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {SplashScreen} from "../views/SplashScreen";
import {LoginScreen} from "../views/LoginScreen";
import {RegisterScreen} from "../views/RegisterScreen";
import {MainScreen} from "../views/MainScreen";
import {EditProfileScreen} from "../views/EditProfileScreen";
import {SettingsScreen} from "../views/SettingsScreen";
import {FriendsScreen} from "../views/FriendsScreen";
import {ChatScreen} from "../views/ChatScreen";

export type RootStackParamsList = {
    Splash: undefined,
    Login: undefined,
    Register: undefined,
    Main: undefined,
    EditProfile: undefined,
    Settings: undefined,
    Friends: undefined,
    Chat: undefined
}
const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function AppNavigator() {
return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />        
        <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
);
}