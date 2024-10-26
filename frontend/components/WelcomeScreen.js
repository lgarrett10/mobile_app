// WelcomeScreen.js
import React from 'react';
import { SafeAreaView, Text, Button, StyleSheet } from 'react-native';
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


  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={{ uri: 'https://example.com/default-avatar.png' }} 
        style={styles.profileImage}   
      />
      <Text style={styles.headerText}>Welcome, {userName}!</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="View Profile" onPress={() => navigation.navigate('Profile')} />
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
      profileIMage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
      },
      button: {
        marginTop: 20,
      }
});
