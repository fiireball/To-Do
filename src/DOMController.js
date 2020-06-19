/* eslint-disable import/extensions */
import projectSorage from './storage.js';

/// DOM CACHING
const DOMController = (() => {
  const projectsContainer = document.querySelector('.projects-container');
  const tasksContainer = document.querySelector('.tasks-container');

  const renderProjects = (allProjects) => {
    allProjects.forEach((project) => {
      const projectCard = document.createElement('div');
      const cardTitle = document.createElement('h4');
      const cardDescription = document.createElement('p');
      const projectTitle = project.getTitle();
      const projectDescription = project.getDescription();
      const projectColor = project.getColor();

      projectCard.classList.add('project-card');

      projectCard['background-color'] = projectColor;
      cardTitle.textContent = projectTitle;
      cardDescription.textContent = projectDescription;

      projectsContainer.appendChild(projectCard);
      projectCard.appendChild(cardTitle);
      projectCard.appendChild(cardDescription);
    });
  };

  const renderTasks = (activeProject) => {
    const tasks = activeProject.getTasks();
    tasks.forEach((task) => {
      console.log(task);
    });
  };

  return {
    renderProjects,
    renderTasks,
  };
})();
export default DOMController;
