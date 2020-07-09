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
  const setTitle = (newTitle) => {
    _title = newTitle;
  };

  const getDescription = () => _description;
  const setDescription = (newDescription) => {
    _description = newDescription;
  };

  const getDueDate = () => _dueDate;
  const setDueDate = (newDueDate) => {
    _dueDate = newDueDate;
  };

  const getPriority = () => _priority;
  const setPriority = (newPriority) => {
    _priority = newPriority;
  };

  const getNotes = () => _notes;
  const setNotes = (newNotes) => {
    _notes = newNotes;
  };

  const getChecklist = () => _checklist;
  const addChecklist = (newChecklist) => {
    checklist.push(newChecklist);
  };

  const getUUID = () => {
    return _UUID;
  };

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
    } else if (_UUID === undefined) {
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
    addChecklist,
    getUUID,
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
    setNotes,
    isCompleted,
    toggleCompleted,
  };
};

const createNewTask = (input) => {
  const _newTask = taskFactory(input.title, input.description, input.dueDate,
    input.priority, input.notes, input.checklist, false, input.projectID);
  console.log(_newTask);
  console.log(_newTask.getNotes());
  pubSub.emit('newTaskCreated', _newTask);
};

pubSub.on('newTaskToCreate', createNewTask);

const checklistFactory = (text, completed) => {
  const _type = 'Checklist';
  let _text = text;
  let _completed = completed;

  const getText = () => _text;
  const setText = (newText) => {
    _text = newText;
  };

  const isCompleted = () => _completed;
  const toggleCompleted = () => {
    if (_completed) {
      _completed = false;
    } else {
      _completed = true;
    }
  };

  return {
    getText,
    setText,
    isCompleted,
    toggleCompleted,
  };
};

export default taskFactory;
