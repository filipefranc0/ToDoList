import React, { useState, useEffect } from "react";
import "../layout/Tarefas.css";
import { initializeApp } from "firebase/app";
import {
  getDocs,
  getFirestore,
  collection,
  doc,
  deleteDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCnCXisVGphtdnGnF81rh-qnpt03AZHlxI",
  authDomain: "todolist-7d939.firebaseapp.com",
  projectId: "todolist-7d939",
});

export function Tarefas() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [itens, setItens] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const db = getFirestore(firebaseApp);
  const tasksCollectionRef = collection(db, "tasks");

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTasks();
  }, []);

  async function deleteTask(id) {
    const tasksDoc = doc(db, "tasks", id);
    await deleteDoc(tasksDoc);
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  }

  async function adicionarItens(id) {
    if (editingTaskId === id) {
      const taskDocRef = doc(db, "tasks", id);
      const updatedTask = tasks.find((t) => t.id === id);
      const newItens = Array.isArray(updatedTask.itens)
        ? [...updatedTask.itens, itens]
        : [itens];
      await setDoc(taskDocRef, {
        itens: newItens,
        task: updatedTask.task,
      });
      const updatedTasks = tasks.map((t) =>
        t.id === id ? { ...t, itens: newItens } : t
      );
      setTasks(updatedTasks);
      setItens("");
      setEditingTaskId(null);
    } else {
      setEditingTaskId(id);
    }
  }

  return (
    <div className="tarefas-container">
      <ul className="tarefas-grid">
        {tasks.map((task) => (
          <div key={task.id} className="tarefas-card">
            <li className="tarefas-task">Tarefa: {task.task}</li>
            <li className="tarefas-title">Itens:</li>
            <ul className="tarefas-item-list">
              {Array.isArray(task.itens) &&
                task.itens.map((item, index) => (
                  <li key={index} className="tarefas-card-li">
                    {item}
                  </li>
                ))}
            </ul>
            <div className="tarefas-input-button-container">
              <input
                type="text"
                className="tarefas-input"
                placeholder="Novo Item"
                value={itens}
                onChange={(e) => setItens(e.target.value)}
              />
              <button
                className={`tarefas-edit-button ${
                  editingTaskId === task.id ? "tarefas-save-button" : ""
                }`}
                onClick={() => adicionarItens(task.id)}
              >
                {editingTaskId === task.id ? "Salvar Itens" : "Editar Itens"}
              </button>
            </div>
            <button
              className="tarefas-delete-button"
              onClick={() => deleteTask(task.id)}
            >
              Deletar
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}
