import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TextInput, Button, View } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const [message, setMessage] = useState('');

  const handlePress = async () => {
    if (isLogin) {
      if (email === '' || password === '') {
        setMessage('Please fill out all fields.');
        return;
      }
      setMessage('Login successful');
    } else {
      if (email === '' || password === '' || firstName === '' || lastName === '') {
        setMessage('Please fill out all fields.');
        return;
      }
      setMessage('Registration successful');
    }
    const url = isLogin ? 'http://192.168.0.8:5000/login' : 'http://192.168.0.8:5000/register';
    const body = isLogin
      ? { username: email, password }
      : { username: email, password }; // Backend only expects username and password for registration

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
        setMessage(isLogin ? 'Login successful' : 'Registration successful');
        if (isLogin && result.token) {
          // You can save the token for future authenticated requests
          console.log('JWT Token:', result.token);
        }
      } else {
        setMessage(result.message || 'Something went wrong.');
      }
    } catch (error) {
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
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter last name"
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </>
        )}
        
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />

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

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width:'80%',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 'auto',
    marginBottom: 12,
    paddingLeft: 8,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    width: '75%', // 75% of the width
    marginBottom: 15, // spacing between buttons
  },
  message: {
    marginTop: 20,
    color: 'green',
    textAlign: 'center',
  },
});
