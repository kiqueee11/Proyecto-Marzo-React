// screens/RegisterScreen.tsx
import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { styles } from '../styles/Style';
import { NavigationProps } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

export const RegisterScreen: React.FC<NavigationProps> = ({ navigation }) => {
  return (
     <LinearGradient
                 colors={['#e35d66', '#a479af']}
                 start={{ x: 0, y: 0 }}
                 end={{ x: 1, y: 0 }} style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Repetir contraseña"
          secureTextEntry
        />
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};