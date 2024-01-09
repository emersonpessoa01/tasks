import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

/* const taskList = [
  { id: "1", title: "Tarefa 01" },
  { id: "2", title: "Tarefa 02" },
  { id: "3", title: "Tarefa 03" },
  // Adicione mais itens conforme necessário
]; */

const dataLoclaStorage = JSON.parse(localStorage.getItem("TAREFAS"));
function App() {
  // const [tasks, setTasks] = useState(taskList);
  const [tasks, setTasks] = useState(dataLoclaStorage);
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
  function removeTask(id) {
    /* Faz uma filtragem devolvendo apenas os itens diferente do id */
    let filteredTasks = tasks.filter((value) => value.id !== id);
    setTasks(filteredTasks);
  }

  useEffect(() => {
    localStorage.setItem("TAREFAS", JSON.stringify(tasks));
  }, [tasks]);
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
        {tasks.map(({ id, title }, index) => (
          <li key={id}>
            {index}-{title}
            <button onClick={() => removeTask(id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
