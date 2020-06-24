/* eslint-disable no-underscore-dangle */

const taskFactory = (title, description, dueDate, priority, notes, checklist, completed) => {
  const _type = 'Task';
  let _title = title;
  let _description = description;
  let _dueDate = dueDate;
  let _priority = priority;
  let _notes = notes;
  let _checklist = checklist;
  let _completed = completed;

  // GETTER & SETTER
  const getType = () => _type;

  const getTitle = () => _title;

  const getDescription = () => _description;

  const getDueDate = () => _dueDate;

  const getPriority = () => _priority;

  const getNotes = () => _notes;

  const getChecklist = () => _checklist;

  const isCompleted = () => _completed;

  const toggleCompleted = () => {
    if (_completed) {
      _completed = false;
    } else {
      _completed = true;
    }
  };

  return {
    getType,
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getNotes,
    getChecklist,
    isCompleted,
    toggleCompleted,
  };
};

export default taskFactory;