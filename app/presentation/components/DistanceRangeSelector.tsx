import React from "react";
import { View, Text } from "react-native";
import Slider from '@react-native-community/slider';
import { styles } from "../styles/Style";

interface DistanceRangeSelectorProps {
    onChange: (distance: string) => void;
}

const DistanceRangeSelector: React.FC<DistanceRangeSelectorProps> = ({ onChange }) => {
    const [distance, setDistance] = React.useState<number>(10);

    const handleSliderChange = (value: number) => {
        setDistance(value);
        onChange(`${Math.floor(value)} km`);
    };

    return (
        <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Distancia de búsqueda</Text>
            <Slider
                minimumValue={1}
                maximumValue={100}
                step={1}
                value={distance}
                onValueChange={handleSliderChange}
                minimumTrackTintColor="#E35D66"
                maximumTrackTintColor="#A479AF"
                thumbTintColor="#E35D66"
            />
            <Text style={styles.rangeText}>Distancia seleccionada: {Math.floor(distance)} km</Text>
        </View>
    );
};

export default DistanceRangeSelector;
