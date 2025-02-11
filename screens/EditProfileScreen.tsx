// screens/EditProfileScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import { styles } from '../styles/Style';
import { NavigationProps } from '../types';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

export const EditProfileScreen: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <LinearGradient
             colors={['#e35d66', '#a479af']}
             start={{ x: 0, y: 0 }}
             end={{ x: 1, y: 0 }}
             style={styles.editProfileContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
        <Text style={styles.headerText}>Editar perfil</Text>
      </TouchableOpacity>
      
      <View style={styles.photoGrid}>
        {[...Array(6)].map((_, index) => (
          <TouchableOpacity key={index} style={styles.photoBox}>
            <Image source={require('../assets/icon.png')} style={styles.cameraIcon} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.personalInfo}>
        <Text style={styles.sectionTitle}>Datos personales</Text>
        <TextInput style={styles.infoInput} value="Enrique Martin" />
        <TextInput style={styles.infoInput} value="26" />
        <TextInput style={styles.infoInput} value="Masculino" />
      </View>

      <TextInput
        style={styles.descriptionInput}
        placeholder="Descripción"
        multiline
      />

      <View style={styles.socialLinks}>
        <Text style={styles.sectionTitle}>Redes Sociales</Text>
        <View style={styles.socialIcons}>
        <TouchableOpacity>
          <Icon name="facebook" size={30} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="twitter" size={30} color="#1DA1F2" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="instagram" size={30} color="#C13584" />
        </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};