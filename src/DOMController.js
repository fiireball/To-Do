/* eslint-disable import/extensions */
import { add } from 'date-fns';
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

      projectCard.setAttribute('data-name', projectTitle);
      projectCard.style['border-color'] = projectColor;
      cardTitle.textContent = projectTitle;
      cardDescription.textContent = projectDescription;

      projectsContainer.appendChild(projectCard);
      cardUpperDiv.appendChild(cardTitle);
      cardLowerDiv.appendChild(cardDescription);
      projectCard.appendChild(cardUpperDiv);
      projectCard.appendChild(cardLowerDiv);
    });
    pubSub.emit('projectsRendered', projectsContainer);
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
    let tasks;
    if (Array.isArray(project)) {
      tasks = project;
    } else {
      tasks = project.getTasks();
    }

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

  const clearTasks = () => {
    const taskCards = tasksContainer.querySelectorAll('.task-card');
    taskCards.forEach((card) => {
      card.remove();
    });
  };

  const refreshTasksRender = (activeProject) => {
    clearTasks();
    renderTasks(activeProject);
  };

  const showAddProjectWindow = () => {
    const addProjectWindow = document.querySelector('.new-project-window');
    const overlay = document.querySelector('.overlay');
    addProjectWindow.classList.add('active');
    overlay.classList.add('active');
    overlay.addEventListener('click', () => {
      addProjectWindow.classList.remove('active');
      overlay.classList.remove('active');
    });
  };

  const addProjectToStorage = () => {
    const input = {
      title: document.getElementById('new-project-title').value,
      description: document.getElementById('new-project-description').value,
      color: undefined,
    }

    pubSub.emit('newProjectToCreate', input);
  };

  return {
    renderProjects,
    renderTasks,
    refreshTasksRender,
    showAddProjectWindow,
    addProjectToStorage,
  };
})();

const clickListeners = (() => {
  const addProjectListeners = (div) => {
    const projectsCards = div.children;
    for (let i = 0; i < projectsCards.length; i++) {
      projectsCards[i].addEventListener('click', () => {
        pubSub.emit('aProjectClicked', projectsCards[i].dataset.name);
      });
    }
  };
  // Add new project button (open window to create new project)
  const newProjectButton = document.getElementById('add-new-project-btn');
  newProjectButton.addEventListener('click', DOMController.showAddProjectWindow);

  const addNewProjectButton = document.getElementById('add-project-to-projects');
  addNewProjectButton.addEventListener('click', DOMController.addProjectToStorage);

  pubSub.on('projectsRendered', addProjectListeners);
})();

export default DOMController;
