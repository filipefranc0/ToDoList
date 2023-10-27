import { Link } from "react-router-dom";
import { Concluido } from "./Concluido";
import { NavBar } from "../layout/NavBar";
import React, { useState, useEffect } from "react";
import "../layout/Home.css"; // Importe o arquivo CSS
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, collection, addDoc } from "firebase/firestore";

// Configure Firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyCnCXisVGphtdnGnF81rh-qnpt03AZHlxI",
  authDomain: "todolist-7d939.firebaseapp.com",
  projectId: "todolist-7d939",
});

export function Home() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [itens, setItens] = useState("");

  const db = getFirestore(firebaseApp);
  const tasksCollectionRef = collection(db, 'tasks');

  async function adicionarTask() {
    const newTask = await addDoc(tasksCollectionRef, {
      task,
      itens,
    });
    // Limpando os campos de entrada após adicionar a tarefa
    setTask("");
    setItens("");
  }

  return (
    <div className="home-container">
      <input
        type="text"
        className="input-field" // Aplicando classe CSS ao campo de entrada de Tarefa
        placeholder="Tarefa"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      
      <button className="add-button" onClick={adicionarTask}>Adicionar Tarefa</button>
    </div>
  );
}
