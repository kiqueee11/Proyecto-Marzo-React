// screens/LoginScreen.tsx
import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { styles } from '../styles/Style';
import { NavigationProps } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

export const LoginScreen: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <LinearGradient
         colors={['#e35d66', '#a479af']}
         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 0 }}
         style={styles.container}>    
      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
        />
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>¿Todavía no estas registrado?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};