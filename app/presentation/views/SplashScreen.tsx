import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PropsStackNavigation } from "../interfaces/StackNav";

const flashmeetlogo = require("../../assets/flashmeet_logo.png");

export function SplashScreen({ navigation }: PropsStackNavigation) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("Login");
        }, 3000);

        return () => clearTimeout(timer); // Limpieza del temporizador
    }, [navigation]);

    return (
        <LinearGradient
            colors={["#E35D66", "#A479AF"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.container}
        >
            <Image
                source={flashmeetlogo}
                style={styles.logoSplash}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logoSplash: {
        width: 300,
        height: 300,
        resizeMode: "contain",
    },
});