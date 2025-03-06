import { useState } from "react";

// Base de datos local con coordenadas de ciudades
const cityCoordinates: { [key: string]: string } = {
    Madrid: "40.4168,-3.7038",
    Barcelona: "41.3888,2.159",
    Valencia: "39.4699,-0.3763",
    Sevilla: "37.3891,-5.9845",
    Bilbao: "43.2630,-2.9350",
    Zaragoza: "41.6488,-0.8891",
    Málaga: "36.7213,-4.4213",
    Murcia: "37.9922,-1.1307",
    Palma: "39.5696,2.6502",
    LasPalmas: "28.1235,-15.4363",
    Alicante: "38.3452,-0.4810",
    Córdoba: "37.8882,-4.7794",
    Valladolid: "41.6523,-4.7245",
    Vigo: "42.2314,-8.7124",
    Gijón: "43.5322,-5.6611",
    Hospitalet: "41.3597,2.0991",
    Vitoria: "42.8467,-2.6716",
    ACoruña: "43.3623,-8.4115",
    Granada: "37.1773,-3.5986",
    Elche: "38.2669,-0.6983",
    Oviedo: "43.3603,-5.8448",
    Badalona: "41.4469,2.2450",
    Cartagena: "37.6074,-0.9911",
    Terrassa: "41.5615,2.0088",
    Jerez: "36.6812,-6.1370",
    Sabadell: "41.5463,2.1086",
    Móstoles: "40.3220,-3.8649",
    SantaCruzdeTenerife: "28.4636,-16.2518",
    AlcaládeHenares: "40.4819,-3.3635",
    Pamplona: "42.8125,-1.6458",
  };

export const useCityCoordinates = () => {
  const [errorCity, setError] = useState("");

  const cityList = Object.keys(cityCoordinates); // Obtener lista de ciudades en orden

  const getCoordinates = (city: string): { coords: string | null; index: number | null } => {
    const formattedCity = city.trim().charAt(0).toUpperCase() + city.trim().slice(1).toLowerCase();
    
    const index = cityList.indexOf(formattedCity);
    if (index !== -1) {
      setError("");
      return { coords: cityCoordinates[formattedCity], index };
    } else {
      setError("Ciudad no encontrada");
      return { coords: null, index: null };
    }
  };

  return { getCoordinates, errorCity };
};
