import { useState } from "react";

// const data = [
//   { task: "Workout", id: 1 },
//   { task: "Study", id: 2 },
//   { task: "Shower", id: 3 },
// ];

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isWrongTask, setIsWrongTask] = useState(false);

  function handleTaskChange(e) {
    setTask(e.target.value);
  }

  function handleAdd(e) {
    e.preventDefault();
    if (task === "" || task.length < 3 || task.length > 12) {
      setIsWrongTask(true);
      setTask("");
      return;
    }

    const newTask = {
      task: task,
      id: new Date().getTime(),
    };

    setTasks([...tasks, newTask]);

    setTask("");
  }

  function closeModal() {
    setIsWrongTask(false);
  }

  return (
    <>
      <div className="container">
        <div className="task-container">
          <form className="form">
            <input
              type="text"
              className="input-text"
              placeholder="Enter Task"
              value={task}
              onChange={handleTaskChange}
            ></input>
            <button className="input-btn" onClick={handleAdd}>
              Add
            </button>
          </form>
          <div className="tasks">
            <PrintTask tasks={tasks} setTasks={setTasks} />
          </div>
        </div>
        {isWrongTask && <WrongTaskModal closeModal={closeModal} />}
      </div>
    </>
  );
}

function PrintTask({ tasks, setTasks }) {
  return (
    <ul className="list-container">
      {tasks.map((task) => (
        <PrintItem key={task.id} task={task} setTasks={setTasks} />
      ))}
    </ul>
  );
}

function PrintItem({ task, setTasks }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [fade, setFade] = useState(false);

  function handleCheckBox() {
    setIsCompleted((prev) => !prev);
  }

  function handleTaskDelete() {
    setFade(true);

    setTimeout(() => {
      if (!isCompleted)
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
      else alert("Complted Task Cannot Be Deleted");
    }, 300);
  }

  return (
    <div
      className={`list-item-container ${isCompleted ? "completed-task" : ""} ${
        fade ? "list-item-fade" : "s"
      }`}
    >
      <input type="checkbox" className="checkBox" onChange={handleCheckBox} />
      <li className="list-item">{task.task}</li>
      <button className="dlt-btn" onClick={handleTaskDelete}>
        ❌
      </button>
    </div>
  );
}

function WrongTaskModal({ closeModal }) {
  const [fade, setFade] = useState(false);
  function handleModalClose() {
    setFade(true);
    setTimeout(() => closeModal(), 500);
  }

  return (
    <>
      <div className={`overlay ${fade ? "overlay-fadeout" : ""}`}>
        <div className="modal-container">
          <div className="text-container">
            Please enter a valid task. Task should not be empty and must be
            between 3 and 12 characters long. Avoid entering numbers or symbols
            that don't form a proper task description.
          </div>
          <button className="modal-btn" onClick={handleModalClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
