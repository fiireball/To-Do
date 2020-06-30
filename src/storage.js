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
    console.log('_activeProject: ', _activeProject);
    return _activeProject;
  };

  const getProjectByID = (UUID) => {
    for (let i = 0; i < _projects.length; i++) {
      if (_projects[i].getUUID() === UUID) {
        return _projects[i];
      }
    }
  };

  return {
    getAllProjects,
    addNewProject,
    setProjects,
    getActiveProject,
    getProjectByID,
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

export default projectStorage;
