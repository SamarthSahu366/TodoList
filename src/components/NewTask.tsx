import React, { useEffect, useState } from 'react';

interface Task {
  text: string;
  date: string;
  completeStatus: boolean;
}

const NewTask = ({
  addTask,
  taskToEdit,
  clearEdit,
}: {
  addTask: (task: Task) => void;
  taskToEdit: Task | null;
  clearEdit: () => void;
}) => {
  const [text, setText] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [completeStatus, setCompleteStatus] = useState<boolean>(false);

  useEffect(() => {
    if (taskToEdit) {
      setText(taskToEdit.text);
      setDate(taskToEdit.date);
      setCompleteStatus(taskToEdit.completeStatus);
    }
  }, [taskToEdit]);

  const handleNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && date.trim()) {
      addTask({ text, date, completeStatus });
      setText('');
      setDate('');
      setCompleteStatus(false);
      clearEdit();
    }
  };

  return (
    <div>
      <form onSubmit={handleNewTask}>
        <div className="form-group">
          <label htmlFor="taskText">{taskToEdit ? 'Edit Task' : 'Add Task'}</label>
          <input
            type="text"
            id="taskText"
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="taskDate">Date</label>
          <input
            type="date"
            id="taskDate"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            id="taskComplete"
            className="form-check-input"
            checked={completeStatus}
            onChange={() => setCompleteStatus(!completeStatus)}
          />
          <label className="form-check-label" htmlFor="taskComplete">
            Completed
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          {taskToEdit ? 'Update Task' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default NewTask;
