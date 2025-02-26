import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { styles } from "../styles/Style";
import { NavigationProps } from "../../types";
import { LinearGradient } from "expo-linear-gradient";

export const SplashScreen: React.FC<NavigationProps> = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Login");
        }, 3000);
    }, []);

    return (
        <LinearGradient
            colors={["#E35D66", "#A479AF"]} 
            start={{ x: 0, y: 0.5 }} 
            end={{ x: 1, y: 0.5 }} 
            style={styles.container}
        >
            <Image
                source={require("../assets/flashmeet_logo.png")}
                style={styles.logoSplash}
            />
        </LinearGradient>
    );
};
