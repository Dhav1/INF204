import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function JogoDaVelha() {
  const [jogadorAtual, setJogadorAtual] = useState("X");

  const [tabuleiro, setTabuleiro] = useState([
    "", "", "",
    "", "", "",
    "", "", "",
  ]);

  // Armazena o vencedor
  const [vencedor, setVencedor] = useState(null);

  // Verificação da combinação vencedora
  const verificarVencedor = (tabuleiro) => {
    const combinacoes = [
      // Linhas
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      // Colunas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      // Diagonais
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combinacao of combinacoes) {
      const [a, b, c] = combinacao;

      if (
        tabuleiro[a] !== "" &&
        tabuleiro[a] === tabuleiro[b] &&
        tabuleiro[a] === tabuleiro[c]
      ) {
        return tabuleiro[a];
      }
    }

    return null;
  };

  const jogar = (indice) => {
    if (tabuleiro[indice] !== "") {
      return;
    }

    if (vencedor !== null) {
      return;
    }

    const novoTabuleiro = [...tabuleiro];

    novoTabuleiro[indice] = jogadorAtual;

    setTabuleiro(novoTabuleiro);

    const resultado = verificarVencedor(novoTabuleiro);

    if (resultado !== null) {
      setVencedor(resultado);
      return;
    }

    const tabuleiroCheio = novoTabuleiro.every(
      (casa) => casa !== ""
    );

    if (tabuleiroCheio) {
      setVencedor("Empate");
      return;
    }

    setJogadorAtual(
      jogadorAtual === "X" ? "O" : "X"
    );
  };

  const reiniciarJogo = () => {
    setTabuleiro([
      "", "", "",
      "", "", "",
      "", "", "",
    ]);

    setJogadorAtual("X");
    setVencedor(null);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Jogo da Velha
      </Text>

      {vencedor === null ? (
        <Text style={styles.jogador}>
          Vez do jogador: {jogadorAtual}
        </Text>
      ) : vencedor === "Empate" ? (
        <Text style={styles.resultado}>
          Empate!
        </Text>
      ) : (
        <Text style={styles.resultado}>
          O jogador {vencedor} ganhou!
        </Text>
      )}

      <View style={styles.linha}>
        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(0)}
        >
          <Text style={styles.simbolo}>
            {tabuleiro[0]}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(1)}
        >
          <Text style={styles.simbolo}>
            {tabuleiro[1]}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(2)}
        >
          <Text style={styles.simbolo}>
            {tabuleiro[2]}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Segunda linha */}
      <View style={styles.linha}>
        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(3)}
        >
          <Text style={styles.simbolo}>
            {tabuleiro[3]}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(4)}
        >
          <Text style={styles.simbolo}>
            {tabuleiro[4]}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(5)}
        >
          <Text style={styles.simbolo}>
            {tabuleiro[5]}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Terceira linha */}
      <View style={styles.linha}>
        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(6)}
        >
          <Text style={styles.simbolo}>
            {tabuleiro[6]}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(7)}
        >
          <Text style={styles.simbolo}>
            {tabuleiro[7]}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(8)}
        >
          <Text style={styles.simbolo}>
            {tabuleiro[8]}
          </Text>
        </TouchableOpacity>
      </View>

      {vencedor !== null && (
        <TouchableOpacity
          style={styles.botaoReiniciar}
          onPress={reiniciarJogo}
        >
          <Text style={styles.textoBotao}>
            Novo jogo
          </Text>
        </TouchableOpacity>
      )}

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

  resultado: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#14325A",
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
    backgroundColor: "#eef4f7",
  },

  simbolo: {
    fontSize: 36,
    fontWeight: "bold",
  },

  botaoReiniciar: {
    backgroundColor: "#14325A",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});