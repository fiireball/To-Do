/* eslint-disable no-underscore-dangle */
import createUUID from './utils';
import pubSub from "./pubsub";

const taskFactory = (title, description, dueDate, priority, notes, checklist, completed, UUID, projectID) => {
  const _type = 'Task';
  let _title = title;
  let _description = description;
  let _dueDate = dueDate;
  let _priority = priority;
  let _notes = notes;
  let _checklist = checklist;
  let _completed = completed;
  let _UUID = UUID;
  let _projectID = projectID;

  // GETTER & SETTER
  const getType = () => _type;

  const getTitle = () => _title;

  const getDescription = () => _description;

  const getDueDate = () => _dueDate;

  const getPriority = () => _priority;

  const getNotes = () => _notes;

  const getChecklist = () => _checklist;

  const getUUID = () => _UUID;

  const isCompleted = () => _completed;

  const toggleCompleted = () => {
    if (_completed) {
      _completed = false;
    } else {
      _completed = true;
    }
  };

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
    getDueDate,
    getPriority,
    getNotes,
    getChecklist,
    getUUID,
    isCompleted,
    toggleCompleted,
  };
};

const createNewTask = (input) => {
  const _newTask = taskFactory(input.title, input.description, input.dueDate,
    input.priority, input.notes, input.checklist, false, input.projectID);
  console.log(_newTask);
  pubSub.emit('newTaskCreated', _newTask);
};

pubSub.on('newTaskToCreate', createNewTask);

export default taskFactory;
