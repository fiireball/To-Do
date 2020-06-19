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

      if (project.isActive()) {
        projectCard.style['background-color'] = 'darkorange';
      }

      projectCard.style['border-color'] = projectColor;
      cardTitle.textContent = projectTitle;
      cardDescription.textContent = projectDescription;

      projectsContainer.appendChild(projectCard);
      projectCard.appendChild(cardTitle);
      projectCard.appendChild(cardDescription);
    });
  };

  const createChecklist = (checklist) => {
    console.log(checklist);
    const checklistDiv = document.createElement('div');
    checklistDiv.classList.add('checklist-container');

    checklist.forEach((item) => {
      const checklistItem = document.createElement('div');

      checklistItem.classList.add('checklist-item');

      checklistItem.textContent = item;

      checklistDiv.appendChild(checklistItem);
    });

    return checklistDiv;
  };

  const renderTasks = (project) => {
    const tasks = project.getTasks();
    tasks.forEach((task) => {
      const taskCard = document.createElement('div');
      const taskTitle = document.createElement('h4');
      const taskDescription = document.createElement('p');
      const taskChecklist = createChecklist(task.getChecklist());
      const taskCompleted = document.createElement('button');

      taskCard.classList.add('task-card');

      taskTitle.textContent = task.getTitle();
      taskDescription.textContent = task.getDescription();
      if (task.isCompleted()) {
        taskCompleted.style['background-color'] = 'green';
      } else {taskCompleted.style['background-color'] = 'red'; }

      taskCard.appendChild(taskTitle);
      taskCard.appendChild(taskDescription);
      taskCard.appendChild(taskChecklist);
      taskCard.appendChild(taskCompleted);

      tasksContainer.appendChild(taskCard);
    });
  };



  return {
    renderProjects,
    renderTasks,
  };
})();
export default DOMController;
