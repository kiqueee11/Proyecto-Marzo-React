import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

interface CityLocatorProps {
  onCityDetected: (city: string, coords: string) => void;
}

export const CityLocator: React.FC<CityLocatorProps> = ({ onCityDetected }) => {
  const [city, setCity] = useState("");

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permiso de ubicación denegado");
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const cityName = getNearestCity(latitude, longitude);
      setCity(cityName);
      onCityDetected(cityName, `${latitude},${longitude}`);
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
    }
  };

  const cityDatabase = [
    { name: "Ciudad de México", lat: 19.4326, lon: -99.1332 },
    { name: "Buenos Aires", lat: -34.6037, lon: -58.3816 },
    { name: "Madrid", lat: 40.4168, lon: -3.7038 },
    { name: "Bogotá", lat: 4.711, lon: -74.0721 },
  ];

  const getNearestCity = (lat: number, lon: number): string => {
    let closestCity = "Desconocida";
    let minDistance = Number.MAX_VALUE;

    for (const city of cityDatabase) {
      const distance = Math.sqrt(
        Math.pow(city.lat - lat, 2) + Math.pow(city.lon - lon, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestCity = city.name;
      }
    }

    return closestCity;
  };

  return null;
};
