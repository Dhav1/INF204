
import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SQLiteProvider,
  useSQLiteContext,
} from "expo-sqlite";

// Função de inicialização das tabelas no banco de dados
const iniciarBanco = async (db) => {
  await db.execAsync("PRAGMA journal_mode = WAL;");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      concluida INTEGER DEFAULT 0
    );
  `);

  console.log("Base de Dados inicializada!");
};

// Componente principal
export default function App() {
  return (
    <SQLiteProvider
      databaseName="app-database.db"
      onInit={iniciarBanco}
    >
      <EcraPrincipal />
    </SQLiteProvider>
  );
}

// Tela principal do aplicativo
function EcraPrincipal() {
  // Acesso à instância do banco de dados
  const db = useSQLiteContext();

  const [nomeUsuario, setNomeUsuario] = useState("Visitante");
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  // Carrega os dados quando a tela é aberta
  useEffect(() => {
    carregarPreferencias();
    carregarTarefas();
  }, []);

  // Leitura assíncrona do AsyncStorage
  const carregarPreferencias = async () => {
    try {
      const nomeSalvo = await AsyncStorage.getItem(
        "@AppTarefas:Nome"
      );

      if (nomeSalvo) {
        setNomeUsuario(nomeSalvo);
      }
    } catch (erro) {
      console.error("Erro ao carregar preferências:", erro);
    }
  };

  // Gravação assíncrona no AsyncStorage
  const salvarNome = async () => {
    try {
      const novoNome = "Estudante INF204";

      await AsyncStorage.setItem(
        "@AppTarefas:Nome",
        novoNome
      );

      setNomeUsuario(novoNome);
    } catch (erro) {
      console.error("Erro ao salvar nome:", erro);
    }
  };

  // Leitura SQL (SELECT)
  const carregarTarefas = async () => {
    try {
      const resultados = await db.getAllAsync(
        "SELECT * FROM tarefas ORDER BY id DESC;"
      );

      setTarefas(resultados);
    } catch (erro) {
      console.error("Falha ao ler dados:", erro);
    }
  };

  // Inserção SQL (INSERT)
  const adicionarTarefa = async () => {
    if (novaTarefa.trim() === "") {
      return;
    }

    try {
      await db.runAsync(
        "INSERT INTO tarefas (descricao, concluida) VALUES (?, ?);",
        [novaTarefa.trim(), 0]
      );

      setNovaTarefa("");

      carregarTarefas();
    } catch (erro) {
      console.error("Erro no INSERT:", erro);
    }
  };

  // Atualização SQL (UPDATE)
  const alternarStatus = async (id, statusAtual) => {
    try {
      const novoStatus = statusAtual === 1 ? 0 : 1;

      await db.runAsync(
        "UPDATE tarefas SET concluida = ? WHERE id = ?;",
        [novoStatus, id]
      );

      carregarTarefas();
    } catch (erro) {
      console.error("Erro ao atualizar tarefa:", erro);
    }
  };

  // Interface visual
  return (
    <View style={styles.container}>

      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>
          Olá, {nomeUsuario}!
        </Text>

        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={salvarNome}
        >
          <Text style={styles.textoBotao}>
            Mudar Nome
          </Text>
        </TouchableOpacity>
      </View>

      {/* Campo para adicionar tarefas */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />

        <TouchableOpacity
          style={styles.botaoAdd}
          onPress={adicionarTarefa}
        >
          <Text style={styles.textoBotao}>
            Add
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de tarefas */}
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cartao}
            onPress={() =>
              alternarStatus(item.id, item.concluida)
            }
          >
            <Text
              style={[
                styles.textoTarefa,
                item.concluida === 1 &&
                  styles.textoConcluido,
              ]}
            >
              {item.descricao}
            </Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

// Estilização dos componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14325A",
  },

  botaoAcao: {
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 8,
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF",
  },

  botaoAdd: {
    backgroundColor: "#0064A0",
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
  },

  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
  },

  cartao: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },

  textoTarefa: {
    fontSize: 18,
    color: "#333",
  },

  textoConcluido: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});
