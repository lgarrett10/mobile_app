import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image, // Import the Image component
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername] = useState(''); // Changed from email to username
  const [profileImage, setProfileImage] = useState(''); // State for profile image
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userUsername = await AsyncStorage.getItem('username'); // Changed to username
        const userFirstName = await AsyncStorage.getItem('firstname');
        const userLastName = await AsyncStorage.getItem('lastname');
        const userProfileImage = await AsyncStorage.getItem('profileImage'); // Fetch profile image

        // Log to check if values are being retrieved
        console.log('Retrieved from AsyncStorage:', {
          username: userUsername, // Changed to username
          firstname: userFirstName,
          lastname: userLastName,
          profileImage: userProfileImage,
        });

        setUsername(userUsername || ''); // Changed to username
        setFirstName(userFirstName || 'First Name');
        setLastName(userLastName || 'Last Name');
        setProfileImage(userProfileImage || ''); // Set profile image
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
      await AsyncStorage.setItem('profileImage', profileImage); // Save profile image
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
          <TextInput
            style={styles.input}
            placeholder="Profile Image URL" // New input for image URL
            value={profileImage} // Bind to profileImage state
            onChangeText={setProfileImage} // Update state with URL input
          />
          <Button title="Save Changes" onPress={handleSaveChanges} />
          <Button title="Cancel" onPress={() => setIsEditing(false)} />
        </>
      ) : (
        <>
          {profileImage ? ( // Render the profile image if available
            <Image
              source={{ uri: profileImage }} // Use the stored image URL
              style={styles.profileImage}
            />
          ) : (
            <Text style={styles.placeholderImage}>No Profile Image</Text>
          )}
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Circular image
    marginBottom: 10,
    alignSelf: 'center',
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd', // Placeholder background color
    alignSelf: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
