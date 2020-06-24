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
    _projects.forEach((project) => {
      if (project.isActive()) {
        console.log(project);
        return project;
      }
    });
  };

  return {
    getAllProjects,
    addNewProject,
    setProjects,
    getActiveProject,
  };
})();

pubSub.on('newProjectCreated', projectStorage.addNewProject);

export default projectStorage;
