import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./app/presentation/navigation/AppNavigator";

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="light" />
            <AppNavigator />
        </NavigationContainer>
    );
}