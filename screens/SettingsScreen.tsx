// screens/SettingsScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { styles } from '../styles/Style';
import { NavigationProps } from '../types';

export const SettingsScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <SafeAreaView style={styles.settingsContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
        <Text style={styles.headerText}>Ajustes</Text>
      </TouchableOpacity>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsHeader}>Ajustes de descubrimiento</Text>
        
        <View style={styles.settingItem}>
          <Text>Rango de edad</Text>
          <Text style={styles.settingValue}>22-28</Text>
        </View>

        <View style={styles.settingItem}>
          <Text>Distancia de busqueda</Text>
          <Text style={styles.settingValue}>20 Km</Text>
        </View>

        <View style={styles.preferencesToggle}>
          <TouchableOpacity style={styles.preferenceButton}>
            <Text>Hombre</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.preferenceButton, styles.activePreference]}>
            <Text>Ambos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.preferenceButton}>
            <Text>Mujer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingItem}>
          <Text>Perfil visible</Text>
          <Switch
            value={isVisible}
            onValueChange={setIsVisible}
          />
        </View>
      </View>

      <View style={styles.sessionButtons}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteText}>Borrar cuenta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
