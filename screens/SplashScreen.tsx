// screens/SplashScreen.tsx
import React from 'react';
import { View, Image } from 'react-native';
import { styles } from '../styles/Style';
import { NavigationProps } from '../types';

export const SplashScreen: React.FC<NavigationProps> = ({ navigation }) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.logo} />
    </View>
  );
};