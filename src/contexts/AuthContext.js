
import React, { createContext, useState } from "react";

// 1. Criação do objeto de Contexto
export const AuthContext = createContext({});

// 2. Componente Provider que irá envolver a aplicação
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // null = Visitante

  // Simulação de um Login
  async function signIn(email, senha) {
    // Aqui aconteceria uma chamada de API (axios.post)
    const respostaAPI = {
      id: "123",
      nome: "Turma INF204",
      email: email,
    };

    setUsuario(respostaAPI);
  }

  // Simulação de um Logout
  function signOut() {
    setUsuario(null);
  }

  return (
    // Injetamos as propriedades e métodos no canal global
    // A conversão booleana (!!usuario) indica se há alguém logado
    <AuthContext.Provider
      value={{
        logado: !!usuario,
        usuario,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
