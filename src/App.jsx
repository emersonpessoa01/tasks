import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const taskList = [
  { id: "1", title: "Tarefa 01" },
  { id: "2", title: "Tarefa 02" },
  { id: "3", title: "Tarefa 03" },
  // Adicione mais itens conforme necessário
];


function App() {
  const [tasks, setTasks] = useState(taskList);
  const [newTask, setNewTask] = useState("");
  // console.log(newTask);

  function addNewTask(event) {
    event.preventDefault();
    setTasks([
      ...tasks,
      {
        // id: tasks.length + 1,
        id: uuidv4,
        title: newTask,
      },
    ]);
    setNewTask(newTask);
  }
  return (
    <div>
      <h1>Lista de Itens</h1>
      <input
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
        type="text"
      />
      <button onClick={addNewTask}>Adicionar</button>
      <ul>
        {tasks.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
