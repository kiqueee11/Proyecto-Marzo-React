import React, { useState, useEffect } from "react";
import { View, Text, Button, ActivityIndicator, FlatList, Alert } from "react-native";
import useMeetViewModel from "../viewModel/MeetViewModel";
import { IUser } from "../../domain/entities/User";
import { PropsStackNavigation } from "../interfaces/StackNav";

export function MeetScreen({ navigation }: PropsStackNavigation) {
  const { users, loading, fetchUsersByPosition } = useMeetViewModel();
  const [error, setError] = useState<string | null>(null);

  const handleFetchUsers = async () => {
    setError(null);
    try {
      await fetchUsersByPosition();
    } catch (err: any) {
      setError(err.message || "Error al obtener los usuarios");
      console.log("Error", err.message || "Error al obtener los usuarios");
    }
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  return (
    <View>
      <Button title="Meet" onPress={handleFetchUsers} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <FlatList
        data={users}
        keyExtractor={(item: IUser) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.nombre} - {item.posicion}</Text>
        )}
      />
    </View>
  );
};

export default MeetScreen;