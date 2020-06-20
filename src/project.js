/* eslint-disable no-underscore-dangle */
const projectFactory = (title, description, color) => {
  const type = 'Project';
  let _title = title;
  let _description = description;
  let _color = color;
  let _tasks = [];
  let _isActive = false;

  // GETTER & SETTER
  const getTitle = () => _title;

  const getDescription = () => _description;

  const getColor = () => _color;

  const getTasks = () => _tasks;
  const setTasks = (newTask) => { _tasks = newTask; };

  const isActive = () => _isActive;
  const setActiveTrue = () => { _isActive = true; };
  const setActiveFalse = () => { _isActive = false; };

  const addTask = (task) => {
    const tasks = getTasks();

    tasks.push(task);
    setTasks(tasks);
  };

  return {
    getTitle,
    getDescription,
    getColor,
    getTasks,
    addTask,
    setTasks,
    isActive,
    setActiveTrue,
    setActiveFalse,
  };
};

export default projectFactory;
