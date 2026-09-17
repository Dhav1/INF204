import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";

// Array estatico fora do componente para no ser recriado a cada render
const contatosIniciais = [

{ id: "1", nome: "Alice Silva", telefone: "(31) 99999-1111" },
{ id: "2", nome: "Bruno Costa", telefone: "(31) 98888-2222" },
{ id: "3", nome: "Carlos Souza", telefone: "(31) 97777-3333" },
{ id: "4", nome: "Diana Rocha", telefone: "(31) 96666-4444" },
{ id: "5", nome: "Eduardo Lima", telefone: "(31) 95555-5555" },
{ id: "6", nome: "Fernanda Alves", telefone: "(31) 94444-6666" },
{ id: "7", nome: "Gabriel Mendes", telefone: "(31) 93333-7777" },
// Desafio para a dupla: Preencham ate ter pelo menos 15 contatos!

];

export default function Agenda() {
  const [contatos, setContatos] = useState(contatosIniciais);

  const renderizarContato = ({ item }) => (
    <View style={styles.cardContato}>
    <Text style={styles.nomeText}>{item.nome}</Text>
    <Text style={styles.telefoneText}>{item.telefone}</Text>
    </View>
  );

  const renderizarSeparador = () => (
    <View style={styles.separador} />
  );

  const renderizarVazio = () => (
    <View style={styles.containerVazio}>
    <Text style={styles.textoVazio}>Agenda Vazia.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
    <View style={styles.cabecalho}>
    <Text style={styles.titulo}>Minha Agenda</Text>
    <TouchableOpacity style={styles.botaoLimpar} onPress={() => setContatos([])}>
    <Text style={styles.textoBotao}>Limpar Tudo</Text>
    </TouchableOpacity>
    </View>

    {<FlatList
      data={contatos}
      keyExtractor={(item) => item.id}
      renderItem={renderizarContato}
      ItemSeparatorComponent={renderizarSeparador}
      ListEmptyComponent={renderizarVazio}
    />}

    </View>
  )
}

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: "#F5F5F5", 
      paddingTop: 50 
    },

    cabecalho: { 
      flexDirection: "row", 
      justifyContent: "space-between", 
      alignItems: "center", 
      paddingHorizontal: 20, 
      marginBottom: 15 
    },
    titulo: { 
      fontSize: 24, 
      fontWeight: "bold", 
      color: "#14325A" 
    },
    botaoLimpar: { 
      backgroundColor: "#D32F2F", 
      padding: 10, 
      borderRadius: 8 
    },
    textoBotao: { 
      color: "#FFF", 
      fontWeight: "bold" 
    },
    cardContato: { 
      padding: 20, 
      backgroundColor: "#FFF" 
    },
    nomeText: { 
      fontSize: 18, 
      fontWeight: "bold", 
      color: "#333" 
    },
    telefoneText: { 
      fontSize: 16, 
      color: "#666", 
      marginTop: 5 
    },
    separador: { 
      height: 1, 
      backgroundColor: "#E0E0E0" 
    },
    containerVazio: { 
      alignItems: "center", 
      marginTop: 50 
    },
    textoVazio: { 
      fontSize: 18, 
      color: "#808080", 
      fontStyle: "italic" 
    }
});