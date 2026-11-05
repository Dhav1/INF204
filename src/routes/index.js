
import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  View,
  Text,
  Button,
} from "react-native";

import { useAuth } from "../hooks/useAuth";

const Stack = createNativeStackNavigator();

// --- TELAS SIMULADAS ---

function TelaLogin() {
  const { signIn } = useAuth(); // Usando nosso hook customizado!

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        Área Restrita
      </Text>

      <Button
        title="Entrar no Sistema"
        onPress={() =>
          signIn("teste@email.com", "123")
        }
      />
    </View>
  );
}

function TelaDashboard() {
  const { usuario, signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        Bem-vindo, {usuario?.nome}
      </Text>

      <Button
        title="Sair da Conta"
        color="red"
        onPress={signOut}
      />
    </View>
  );
}

// --- ROTEADOR PRINCIPAL ---

export default function Rotas() {
  const { logado } = useAuth(); // Escuta o estado global

  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* Renderização condicional baseada no estado global */}

        {logado ? (
          <Stack.Screen
            name="Dashboard"
            component={TelaDashboard}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={TelaLogin}
          />
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}
