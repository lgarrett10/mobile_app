import React, {useState} from 'react';
import{View, Text, TextInput, Button, StyleSheet} from 'react-native';

export default function ProfileScreen({ route, navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const saveProfile = () => {
        alert('Profile Saved!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Profile</Text>
            <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
            />
            <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
            />
            <Button title="Save" onPress={saveProfile} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 15},
    headerText: {fontsize: 24, textAlign: 'center', marginBottom: 20},
    input: {marginVertical: 10, borderBottomWidth: 1, padding: 8}
});