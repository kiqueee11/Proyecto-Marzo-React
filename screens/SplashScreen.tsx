// screens/SplashScreen.tsx
import React from 'react';
import { View, Image } from 'react-native';
import { styles } from '../styles/Style';
import { NavigationProps } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

export const SplashScreen: React.FC<NavigationProps> = ({ navigation }) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 5000);
  }, []);

  return (
    <LinearGradient
     colors={['#e35d66', '#a479af']}
     start={{ x: 0, y: 0 }}
     end={{ x: 1, y: 0 }}
     style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.logo} />
    </LinearGradient>
  );
};