import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
export default function Home({ navigation }) {

return (
    <View style={styles.container}>
    <Text style={styles.titulo}>Configurações</Text>
    </View>
);

}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20 }
});