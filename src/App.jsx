import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Pencil from "./components/pencil";
import Trash from "./components/Trash";

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
  const [editTaskId, setEditTaskId] = useState("");
  const [saveButton, setSaveButton] = useState(false);
  // console.log(newTask);
  function handleAddNewTask() {
    // event.preventDefault();
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

  function handleEditTask(id) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setNewTask(task.title);
      setEditTaskId(task.id);
      console.log(task.id);
      setSaveButton(true);
    }
    return;
  }

  function handleSaveTask() {
    const task = tasks.find((task) => task.id === editTaskId);
    if (task) {
      task.title = newTask;
      setSaveButton(false);
    }
    setTasks([...tasks]);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && event.target.value !== "") {
      handleAddNewTask();
    }
    // console.log(event.keyCode)
  }
  // function handleKeyDown(event) {
  //   let key = event.keyCode;
  //   if (key === 13 && event.target.value !== "") {
  //     handleAddNewTask();
  //   }
  //   console.log(key)
  // }

  useEffect(() => {
    localStorage.setItem("TAREFAS", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <h1>Lista de Itens</h1>

      <input
        autoFocus
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
        type="text"
        onKeyDown={handleKeyDown}
      />
      {saveButton ? (
        <button onClick={handleSaveTask}>Salvar</button>
      ) : (
        <button onClick={handleAddNewTask}>Adicionar</button>
      )}

      <ul>
        {tasks.map(({ id, title }, index) => (
          <li key={id}>
            {index + 1} - {title}
            <span>
              <button
                onClick={() => {
                  handleEditTask(id);
                }}
              >
                <Pencil />
              </button>
              <button onClick={() => handleRemoveTask(id)}>
                <Trash />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
