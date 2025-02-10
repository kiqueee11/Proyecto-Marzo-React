// screens/MainScreen.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { styles } from '../styles/Style';
import { NavigationProps } from '../types';

export const MainScreen: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('EditProfile')}>
        <Image
          style={styles.profileImage}
          source={require('../assets/icon.png')}
        />
        <Text style={styles.profileName}>Enrique Martin</Text>
        <Text style={styles.profileAge}>26</Text>
      </TouchableOpacity>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
          <Image source={require('../assets/icon.png')} style={styles.icon} />
          <Text>Ajustes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Friends')}>
          <Image source={require('../assets/icon.png')} style={styles.icon} />
          <Text>Amigos</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.meetButton}>
        <Text style={styles.meetButtonText}>MEET</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};