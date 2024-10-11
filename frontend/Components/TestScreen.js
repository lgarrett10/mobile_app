import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function TestScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Welcome to test screen!</Text>
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
});
