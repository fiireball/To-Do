/* eslint-disable no-underscore-dangle */
const projectStorage = (() => {
  const _type = 'Project-Storage';
  let _projects = [];

  const getAllProjects = () => _projects;

  const addNewProject = (newProject) => {
    _projects.push(newProject);
  };

  const setProjects = (projects) => {
    _projects = projects;
  }

  return {
    getAllProjects,
    addNewProject,
    setProjects,
  };
})();

export default projectStorage;
