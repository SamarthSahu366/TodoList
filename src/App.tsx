import './App.css';
import { useState } from 'react';
import NewTask from './components/NewTask';
import List from './components/List';

type Task ={
  text: string;
  date: string;
  completeStatus: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<number | null>(null);

  const addTask = (newTask: Task) => {
    if (newTask.text.trim()) {
      if (taskToEdit !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === taskToEdit ? newTask : task
        );
        setTasks(updatedTasks);
        setTaskToEdit(null);
      } else {
        setTasks([...tasks, newTask]);
      }
    }
  };

  const deleteTask = (taskIndex: number) => {
    setTasks(tasks.filter((_, index) => index !== taskIndex));
  };

  const updateTask = (taskIndex: number) => {
    setTaskToEdit(taskIndex);
  };

  const toggleCompleteStatus = (taskIndex: number) => {
    setTasks(
      tasks.map((task, index) =>
        index === taskIndex
          ? { ...task, completeStatus: !task.completeStatus }
          : task
      )
    );
  };

  return (
    <div className="App">
      <div>
        <NewTask
          addTask={addTask}
          taskToEdit={taskToEdit !== null ? tasks[taskToEdit] : null}
          clearEdit={() => setTaskToEdit(null)}
        />
      </div>
      <List
        tasks={tasks}
        deleteTask={deleteTask}
        updateTask={updateTask}
        toggleCompleteStatus={toggleCompleteStatus}
      />
    </div>
  );
}

export default App;
