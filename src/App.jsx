import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

/* const taskList = [
  { id: "1", title: "Tarefa 01" },
  { id: "2", title: "Tarefa 02" },
  { id: "3", title: "Tarefa 03" },
  // Adicione mais itens conforme necessário
]; */

// type TaskProps = {
//   id: string;
//   title: string;
// }[];

const dataLocalStorage = JSON.parse(localStorage.getItem("TAREFAS") || "[]");
function App() {
  // const [tasks, setTasks] = useState(taskList);
  // const [tasks, setTasks] = useState<TaskProps[]>(dataLoclaStorage);
  const [tasks, setTasks] = useState(dataLocalStorage);
  const [newTask, setNewTask] = useState("");
  // console.log(newTask);
  function handleAddNewTask(event) {
    event.preventDefault();
    setTasks([
      ...tasks,
      {
        // id: tasks.length + 1,
        id: uuidv4(),
        title: newTask,
      },
    ]);
    setNewTask("");
  }
  function handleRemoveTask(id) {
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
      <form>
        <input
          autoFocus
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          type="text"
          // onKeyDown={handleKeyPress}
        />
        <button onClick={handleAddNewTask}>Adicionar</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={task.id}>
              {index}-{task.title}
              <button onClick={() => handleRemoveTask(task.id)}>delete</button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
