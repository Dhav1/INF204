import React, { useState } from "react";
import {View, Text, TouchableOpacity, StyleSheet,} from "react-native";

export default function JogoDaVelha() {
  const [jogadorAtual, setJogadorAtual] = useState("X");

  // 9 casas do tabuleito
  const [tabuleiro, setTabuleiro] = useState([
    "", "", "",
    "", "", "",
    "", "", "",
  ]);

  // Função chamada quando uma casa é pressionada
  const jogar = (indice) => {
    // Se a casa já estiver preenchida, não faz nada
    if (tabuleiro[indice] !== "") {
      return;
    }

    // Cria uma cópia do tabuleiro
    const novoTabuleiro = [...tabuleiro];

    // Coloca X ou O na casa escolhida
    novoTabuleiro[indice] = jogadorAtual;

    // Atualiza o tabuleiro
    setTabuleiro(novoTabuleiro);

    // Troca o jogador
    setJogadorAtual(jogadorAtual === "X" ? "O" : "X");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Jogo da Velha</Text>

      <Text style={styles.jogador}>
        Vez do jogador: {jogadorAtual}
      </Text>

      {/* Primeira linha */}
      <View style={styles.linha}>
        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(0)}
        >
          <Text style={styles.simbolo}>{tabuleiro[0]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(1)}
        >
          <Text style={styles.simbolo}>{tabuleiro[1]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(2)}
        >
          <Text style={styles.simbolo}>{tabuleiro[2]}</Text>
        </TouchableOpacity>
      </View>

      {/* Segunda linha */}
      <View style={styles.linha}>
        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(3)}
        >
          <Text style={styles.simbolo}>{tabuleiro[3]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(4)}
        >
          <Text style={styles.simbolo}>{tabuleiro[4]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(5)}
        >
          <Text style={styles.simbolo}>{tabuleiro[5]}</Text>
        </TouchableOpacity>
      </View>

      {/* Terceira linha */}
      <View style={styles.linha}>
        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(6)}
        >
          <Text style={styles.simbolo}>{tabuleiro[6]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(7)}
        >
          <Text style={styles.simbolo}>{tabuleiro[7]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(8)}
        >
          <Text style={styles.simbolo}>{tabuleiro[8]}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },

  jogador: {
    fontSize: 18,
    marginBottom: 15,
  },

  linha: {
    flexDirection: "row",
  },

  celula: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  simbolo: {
    fontSize: 36,
    fontWeight: "bold",
  },
});