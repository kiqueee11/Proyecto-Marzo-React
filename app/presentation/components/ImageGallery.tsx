import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import { GetDataRepository } from '../../domain/repositories/GetDataRepository';

const ImageGallery: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 'pQkZWrz7dwxJ0z4'; // Ejemplo de userId
        const data = await GetDataRepository.obtenerDatosUsuario(userId);
        
        if (data) {
          setUserData(data);
        } else {
          setError('No se pudieron cargar los datos del usuario');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Datos del Usuario</Text>
      <Text>Nombre: {userData.userName}</Text>
      <Text>Edad: {userData.edad}</Text>
      <Text>Sexo: {userData.sexo}</Text>
      <Text>Descripción: {userData.descripcion}</Text>

      <Text style={styles.header}>Galería de Imágenes</Text>
      {userData.imagenesBase64.length > 0 ? (
        <View style={styles.galleryContainer}>
          {userData.imagenesBase64.map((image: string, index: number) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ))}
        </View>
      ) : (
        <Text>No se encontraron imágenes</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  imageContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default ImageGallery;
