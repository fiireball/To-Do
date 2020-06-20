/* eslint-disable import/extensions */
import projectSorage from './storage.js';
import pubSub from './pubsub.js';

/// DOM CACHING
const DOMController = (() => {
  const projectsContainer = document.querySelector('.projects-container');
  const tasksContainer = document.querySelector('.tasks-container');

  const renderProjects = (allProjects) => {
    allProjects.forEach((project) => {
      const projectCard = document.createElement('div');
      const cardUpperDiv = document.createElement('div');
      const cardLowerDiv = document.createElement('div');
      const cardTitle = document.createElement('h4');
      const cardDescription = document.createElement('p');
      const projectTitle = project.getTitle();
      const projectDescription = project.getDescription();
      const projectColor = project.getColor();

      projectCard.classList.add('project-card');
      cardUpperDiv.classList.add('project-card-upper');
      cardLowerDiv.classList.add('project-card-lower');

      if (project.isActive()) {
        projectCard.classList.add('active-project');
        projectCard.style['background-color'] = 'darkorange';
      }

      projectCard.style['border-color'] = projectColor;
      cardTitle.textContent = projectTitle;
      cardDescription.textContent = projectDescription;

      projectsContainer.appendChild(projectCard);
      cardUpperDiv.appendChild(cardTitle);
      cardLowerDiv.appendChild(cardDescription);
      projectCard.appendChild(cardUpperDiv);
      projectCard.appendChild(cardLowerDiv);
    });
  };

  const createChecklist = (checklist) => {
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
      const taskTitleDiv = document.createElement('div');
      const taskTitle = document.createElement('h4');
      const taskDescriptionDiv = document.createElement('div');
      const taskDescription = document.createElement('p');
      const taskChecklist = createChecklist(task.getChecklist());
      const taskCompleted = document.createElement('button');

      taskCard.classList.add('task-card');
      taskTitleDiv.classList.add('task-title-container');
      taskDescriptionDiv.classList.add('task-description-container');

      taskTitle.textContent = task.getTitle();
      taskDescription.textContent = task.getDescription();
      if (task.isCompleted()) {
        taskCompleted.style['background-color'] = 'green';
      } else { taskCompleted.style['background-color'] = 'red'; }

      taskTitleDiv.appendChild(taskTitle);
      taskTitleDiv.appendChild(taskCompleted);
      taskDescriptionDiv.appendChild(taskDescription);
      taskCard.appendChild(taskTitleDiv);
      taskCard.appendChild(taskDescriptionDiv);
      taskCard.appendChild(taskChecklist);

      tasksContainer.appendChild(taskCard);
    });
  };

  return {
    renderProjects,
    renderTasks,
  };
})();
export default DOMController;
