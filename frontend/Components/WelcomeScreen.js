// WelcomeScreen.js
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Button,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AddItemModal from "./AddItemModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";

export default function WelcomeScreen({ navigation, setIsLoggedIn }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const addItem = async (newItem) => {
    console.log("Adding item:", newItem);
    try {
      const token = await AsyncStorage.getItem("token");
      console.log('Token in addItem:', token);
      const response = await fetch(
        'http://192.168.0.8:5000/items/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newItem),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("server error", errorResponse);
        throw new Error( errorResponse.message || 'Failed to add item');
      }
      const savedItem = await response.json();
      console.log("saved", savedItem);
      setData((prevData) => [
        savedItem,
        ...prevData,
      ]);
    } catch (error) {
      console.error("Error adding item", error);
      alert("Failed to add item");
    }
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigateToTestScreen = () => {
    navigation.navigate("TestScreen");
  };

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch("http://192.168.0.8:5000/items/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const items = await response.json();
        setData(items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Welcome!</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data.length ? (
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            )}
          />
          <AddItemModal onAddItem={addItem} />
        </View>
      ) : (
        <View>
          <Text>No Items, press '+' to add items</Text>
          <AddItemModal onAddItem={addItem} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Test Screen"
          onPress={navigateToTestScreen}
        />
        <Button style={styles.button} title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}
