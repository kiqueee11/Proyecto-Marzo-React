// AgeRangeSelector.tsx
import React from "react";
import { View, Text } from "react-native";
import Slider from '@react-native-community/slider';
import { styles } from "../styles/Style";

interface AgeRangeSelectorProps {
    onChange: (range: string) => void; // Función que recibe el rango seleccionado
}

const AgeRangeSelector: React.FC<AgeRangeSelectorProps> = ({ onChange }) => {
    const [ageRange, setAgeRange] = React.useState<number>(18); // Estado para el rango de edad

    const handleSliderChange = (value: number) => {
        setAgeRange(value);
        onChange(`De 18 a ${Math.floor(value)}`);
    };

    return (
        <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Rango de Edad</Text>
            <Slider
                minimumValue={18}
                maximumValue={100}
                step={1}
                value={ageRange}
                onValueChange={handleSliderChange}
                minimumTrackTintColor="#E35D66"
                maximumTrackTintColor="#A479AF"
                thumbTintColor="#E35D66"
            />
            <Text style={styles.rangeText}>Edad seleccionada: {Math.floor(ageRange)}</Text>
        </View>
    );
};

export default AgeRangeSelector;
