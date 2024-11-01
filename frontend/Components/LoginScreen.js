import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TextInput, Button, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/styles';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState(''); // Changed from email to username
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState(''); // State for first name
  const [lastname, setLastName] = useState(''); // State for last name
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const handlePress = async () => {
    if (isLogin) {
      if (username === '' || password === '') {
        setMessage('Please fill out all fields.');
        return;
      }
    } else {
      if (username === '' || password === '' || firstname === '' || lastname === '') {
        setMessage('Please fill out all fields.');
        return;
      }
    }

    const url = isLogin
      ? 'http://localhost:5000/users/login'
      : 'http://localhost:5000/users/register';

    const body = isLogin
      ? { username: username, password }
      : { username: username, password, firstname: firstname, lastname: lastname }; // Include first name and last name in registration

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (response.ok) {
        if (isLogin) {
          setMessage('Login successful');
          if (result.token) {
            // Save token and update login state            
            await AsyncStorage.setItem('username', username); // Updated to save username
            await AsyncStorage.setItem('token', result.token);
            await AsyncStorage.setItem('firstname', firstname); // Store first name from response or state
            await AsyncStorage.setItem('lastname', lastname); // Store last name from response or state
            setIsLoggedIn(true);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });
          }
        } else {
          setMessage('Registration successful. Please log in.');
          setIsLogin(true); // Switch to login view
        }
      } else {
        setMessage(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error connecting to the server.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>{isLogin ? "Login" : "Sign Up"}</Text>
        
        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              value={firstname}
              onChangeText={text => setFirstName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter last name"
              value={lastname}
              onChangeText={text => setLastName(text)}
            />
          </>
        )}
        
        <TextInput
          style={styles.input}
          placeholder="Enter username" // Updated placeholder
          value={username} // Updated to use username
          onChangeText={text => setUsername(text)} // Updated to use username
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title={isLogin ? "Login" : "Sign Up"}
                onPress={handlePress}
              />
            </View>
            <View style={styles.button}>
              <Button
                title={isLogin ? "Switch to Sign Up" : "Switch to Login"}
                onPress={() => setIsLogin(!isLogin)}
              />
            </View>
          </View>
        </View>

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

const loginStyles = StyleSheet.create({
  loginButtonContainer: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});
