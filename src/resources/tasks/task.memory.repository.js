const Tasks = [];

const getAll = async (boardId) => {
  console.log(Tasks, boardId);
  return Tasks.filter((el) => el.boardId === boardId);
}

const addTask = async (taskRow) => {
  Tasks.push(taskRow);
  return taskRow;
}

const getTask = async (boardId, taskId) => {
  const task = Tasks.find((el) =>  el.id === taskId && el.boardId === boardId);
  return task;
}

const updateTask = async (taskRow) => {
  const task = Tasks.find((el) =>  el.id === taskRow.id && el.boardId === taskRow.boardId);
  if (task !== undefined) {
    task.title = taskRow.title;
    task.order = taskRow.order;
    task.description = taskRow.description;
    task.userId = taskRow.userId;
    task.columnId = taskRow.columnId;
  }
  return task;
}

const deleteTask = async (taskId) => {
  const task = Tasks.find((el) =>  el.id === taskId);
  const index = Tasks.indexOf(task);
  if (index > -1) {
    Tasks.splice(index, 1);
  }
  return index !== -1 ;
}


module.exports = { getAll, addTask, getTask, updateTask, deleteTask };
