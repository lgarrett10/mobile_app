import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername] = useState(''); // Changed from email to username
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {        
        const userUsername = await AsyncStorage.getItem('username'); // Changed to username
        const userFirstName = await AsyncStorage.getItem('firstname');
        const userLastName = await AsyncStorage.getItem('lastname');
        
        // Log to check if values are being retrieved
        console.log('Retrieved from AsyncStorage:', {
          username: userUsername, // Changed to username
          firstname: userFirstName,
          lastname: userLastName,
  
        });
        setUsername(userUsername); // Changed to username
        setFirstName(userFirstName);
        setLastName(userLastName);
      
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    try {      
      await AsyncStorage.setItem('username', username); // Changed to username
      await AsyncStorage.setItem('firstname', firstname);
      await AsyncStorage.setItem('lastname', lastname);
      setIsEditing(false);
    } catch (error) {
      console.log('Error saving user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstname}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastname}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Username" // Updated placeholder
            value={username} // Changed to username
            onChangeText={setUsername} // Changed to username
          />
          <Button title="Save Changes" onPress={handleSaveChanges} />
          <Button title="Cancel" onPress={() => setIsEditing(false)} />
        </>
      ) : (
        <>
          <Text style={styles.label}>First Name: {firstname}</Text>
          <Text style={styles.label}>Last Name: {lastname}</Text>
          <Text style={styles.label}>Username: {username}</Text> {/* Changed to username */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.navigate('Welcome')}
      >
        <Text style={styles.buttonText}>Back to Welcome</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#28A745',
  },
});
