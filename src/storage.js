import pubSub from "./pubsub";

/* eslint-disable no-underscore-dangle */
const projectStorage = (() => {
  const _type = 'Project-Storage';
  let _projects = [];

  const getAllProjects = () => _projects;

  const addNewProject = (newProject) => {
    _projects.push(newProject);
    pubSub.emit('projectsListChanged', _projects);
  };

  const setProjects = (projects) => {
    _projects = projects;
  };

  const getActiveProject = () => {
    let _activeProject;
    for (let i = 0; i < _projects.length; i++) {
      if (_projects[i].isActive()) {
        _activeProject = _projects[i];
      }
    }
    return _activeProject;
  };

  const getProjectByID = (UUID) => {
    for (let i = 0; i < _projects.length; i++) {
      if (_projects[i].getUUID() === UUID) {
        return _projects[i];
      }
    }
  };

  const getTaskByID = (taskID) => {
    const _activeProject = getActiveProject();
    const _task = _activeProject.getTaskByID(taskID)
    return _task;
  };

  const toggleTaskCompletedByID = (taskID) => {
    const _task = getTaskByID(taskID);
    _task.toggleCompleted();
  };

  const toggleChecklistCompletedByTaskID = (input) => {
    const _taskID = input.taskID;
    const _task = getTaskByID(_taskID);
    const _index = input.index;
    const _checklist = _task.getChecklist();
    _checklist[_index].toggleCompleted();
  };

  return {
    getAllProjects,
    addNewProject,
    setProjects,
    getActiveProject,
    getProjectByID,
    toggleTaskCompletedByID,
    toggleChecklistCompletedByTaskID,
  };
})();

const addTaskToActiveProject = (newTask) => {
  const currentProject = projectStorage.getActiveProject();
  if (currentProject) {
    currentProject.addTask(newTask);
    pubSub.emit('tasksChanged', currentProject);
  } else {
    const err = 'ERROR - no current project';
    console.log(err, currentProject);
    pubSub.emit('taskAddError', err);
  }
};

pubSub.on('newTaskCreated', addTaskToActiveProject);
pubSub.on('newProjectCreated', projectStorage.addNewProject);
pubSub.on('aTaskCheckboxToggled', projectStorage.toggleTaskCompletedByID);
pubSub.on('aChecklistCheckboxToggled', projectStorage.toggleChecklistCompletedByTaskID);

export default projectStorage;
