// screens/FriendsScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, FlatList } from 'react-native';
import { styles } from '../styles/Style';
import { NavigationProps } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

interface Friend {
  id: string;
  name: string;
  message: string;
  image: any;
}

export const FriendsScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const friends: Friend[] = [
    {
      id: '1',
      name: 'Manuel',
      message: 'Hola que tal soy m...',
      image: require('../assets/icon.png')
    },
    {
      id: '2',
      name: 'Manuel',
      message: 'Hola que tal soy m...',
      image: require('../assets/icon.png')
    }
  ];

  return (
     <LinearGradient
                 colors={['#e35d66', '#a479af']}
                 start={{ x: 0, y: 0 }}
                 end={{ x: 1, y: 0 }} style={styles.friendsContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
        <Text style={styles.headerText}>Amigos</Text>
      </TouchableOpacity>

      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.friendItem}>
            <Image source={item.image} style={styles.friendImage} />
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.friendMessage}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
};