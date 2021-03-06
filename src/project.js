import pubSub from './pubsub';
import createUUID from './utils';
/* eslint-disable no-underscore-dangle */
const projectFactory = (title, description, color, UUID) => {
  const _type = 'Project';
  let _title = title;
  let _description = description;
  let _color = color;
  let _tasks = [];
  let _isActive = false;
  let _UUID = UUID;

  // GETTER & SETTER
  const getType = () => _type;

  const getTitle = () => _title;

  const getDescription = () => _description;

  const getColor = () => _color;

  const getTasks = () => _tasks;
  const setTasks = (newTask) => { _tasks = newTask; };

  const getTaskByID = (taskID) => {
    for (let i = 0; i < _tasks.length; i++) {
      if (_tasks[i].getUUID() === taskID) {
        return _tasks[i];
      }
    }
    console.log('No task with ID: ', taskID);
    return `No task with ID: , ${taskID}`;
  };

  const isActive = () => _isActive;
  const setActiveTrue = () => { _isActive = true; };
  const setActiveFalse = () => { _isActive = false; };

  const getUUID = () => _UUID;

  const addTask = (task) => {
    const tasks = getTasks();
    tasks.push(task);
    setTasks(tasks);
  };

  const toggleActive = (refTitle) => {
    if (_isActive) { setActiveFalse(); }
    if (refTitle === _title) { setActiveTrue(); }
    if (_isActive) {
      pubSub.emit('activeProjectChanged', _tasks);
    }
  };

  pubSub.on('aProjectClicked', toggleActive);

  const initUUID = (() => {
    if (UUID) {
      _UUID = UUID;
    } else {
      _UUID = createUUID(_type);
    }
  })();

  return {
    getType,
    getTitle,
    getDescription,
    getColor,
    getTasks,
    addTask,
    setTasks,
    getTaskByID,
    isActive,
    setActiveTrue,
    setActiveFalse,
    getUUID,
  };
};

const createNewProject = (input) => {
  console.log('input: ', input);

  const _newProject = projectFactory(input.title, input.description, input.color);
  console.log('_newProject.getTitle()', _newProject.getTitle());
  console.log('_newProject.getDescription()', _newProject.getDescription());
  pubSub.emit('newProjectCreated', _newProject);
};

pubSub.on('newProjectToCreate', createNewProject);

export default projectFactory;
