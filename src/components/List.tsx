
interface Task {
  text: string;
  date: string;
  completeStatus: boolean;
}

const List = ({
  tasks,
  deleteTask,
  updateTask,
  toggleCompleteStatus,
}: {
  tasks: Task[];
  deleteTask: (index: number) => void;
  updateTask: (index: number) => void;
  toggleCompleteStatus: (index: number) => void;
}) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index} style={{ textDecoration: task.completeStatus ? 'line-through' : 'none' }}>
          <div>{index + 1}</div>
          <div>{task.text}</div>
          <div>Date: {task.date}</div>
          <div>
            <input
              type="checkbox"
              checked={task.completeStatus}
              onChange={() => toggleCompleteStatus(index)}
            />{' '}
            Completed
          </div>
          <button onClick={() => deleteTask(index)}>Delete</button>
          <button onClick={() => updateTask(index)}>Update</button>
        </li>
      ))}
    </ul>
  );
};

export default List;
