import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./app/presentation/navigation/AppNavigator";
import { UserProvider } from "./app/presentation/context/UserContextType";

export default function App() {
    return (  
        <UserProvider>      
            <NavigationContainer>
                <StatusBar style="light" />
                <AppNavigator />
            </NavigationContainer>
        </UserProvider>
    );
}