// WelcomeScreen.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Button, StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeScreen({ navigation, setIsLoggedIn }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigateToTestScreen = () => {
    navigation.navigate('TestScreen');
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=2')
      .then((response) => response.json())
      .then((json) =>{ 
        setData(json)
    })
      .catch((error) => {
        console.error('error fetching data', error)
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Welcome!</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Test Screen" onPress={navigateToTestScreen} />
        <Button style={styles.button} title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
      },
      headerText: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
      },
      buttonContainer: {
        marginVertical: 10,
        alignSelf: 'center',
        width: '50%',
        display: 'flex',
        justifyContent: 'space-between',
        height: 80,
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },  
      title: {
        fontSize: 32,
      },
});
