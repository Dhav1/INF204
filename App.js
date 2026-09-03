import React, { useState } from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView,} from "react-native";

import JogoDaVelha from "./JogoDaVelha";

export default function App() {
  // Estado para controlar o nome do primeiro perfil
  const [nome, setNome] = useState("Fulano da Town");

  // Estado para controlar se o primeiro perfil está sendo seguido
  const [seguindo, setSeguindo] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.titulo}>Perfis</Text>
      
      {/* PERFIL 1 */}
      <View style={styles.cartao}>

        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/32.jpg",
          }}
          style={styles.avatar}
        />

        <Text style={styles.nomeUsuario}>
          {nome}
        </Text>

        <Text style={styles.profissao}>
          Dev
        </Text>
        
        <TouchableOpacity
          style={[
            styles.botao,
            seguindo && styles.botaoDesativado,
          ]}
          activeOpacity={0.7}
          onPress={() => setSeguindo(!seguindo)}
        >
          <Text style={styles.textoBotao}>
            {seguindo ? "Já Seguindo" : "Seguir"}
          </Text>
        </TouchableOpacity>

        {/* Campo para alterar o nome*/} 
        <TextInput
          style={styles.input}
          placeholder="Alterar nome..."
          value={nome}
          onChangeText={(texto) => setNome(texto)}
        />

      </View>

      {/* PERFIL 2 */}
      <View style={styles.cartao}>

        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/women/7.jpg",
          }}
          style={styles.avatar}
        />

        <Text style={styles.nomeUsuario}>
          Marina Silva
        </Text>

        <Text style={styles.profissao}>
          Dev Front-end
        </Text>

        <TouchableOpacity
          style={styles.botao}
          activeOpacity={0.7}
          onPress={() => alert("Seguindo Marina Silva")}
        >
          <Text style={styles.textoBotao}>
            Seguir
          </Text>
        </TouchableOpacity>

      </View>

      {/* PERFIL 3 */}
      <View style={styles.cartao}>

        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/65.jpg",

          }}
          style={styles.avatar}
        />

        <Text style={styles.nomeUsuario}>
          Jonas Oliveira
        </Text>

        <Text style={styles.profissao}>
          Engenheiro de Software
        </Text>

        <TouchableOpacity
          style={styles.botao}
          activeOpacity={0.7}
          onPress={() => alert("Seguindo Jonas Oliveira")}
        >
          <Text style={styles.textoBotao}>
            Seguir
          </Text>
        </TouchableOpacity>

      </View>

      <JogoDaVelha />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#14325A",
    marginBottom: 20,
  },

  cartao: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "80%",
    marginBottom: 20,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

  nomeUsuario: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#14325A",
  },

  profissao: {
    fontSize: 16,
    color: "#505050",
    marginBottom: 20,
  },

  botao: {
    backgroundColor: "#0064A0",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },

  botaoDesativado: {
    backgroundColor: "#808080",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
  },

});