/* eslint-disable import/extensions */
import { format } from 'date-fns';
import projectSorage from './storage.js';
import pubSub from './pubsub.js';
import projectStorage from './storage.js';

/// DOM CACHING
const DOMController = (() => {
  const projectsContainer = document.querySelector('.projects-container');
  const tasksContainer = document.querySelector('.tasks-container');
  const overlay = document.querySelector('.overlay');
  const addTaskWindow = document.querySelector('.new-task-window');
  const addProjectWindow = document.querySelector('.new-project-window');
  const taskWindowErrorContainer = addTaskWindow.querySelector('.task-window-error');

  /// Render stuff
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
      const projectUUID = project.getUUID();

      projectCard.classList.add('project-card');
      cardUpperDiv.classList.add('project-card-upper');
      cardLowerDiv.classList.add('project-card-lower');

      if (project.isActive()) {
        projectCard.classList.add('active-project');
      }

      projectCard.setAttribute('data-name', projectTitle);
      projectCard.setAttribute('data-ID', projectUUID);
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
    const checklistHeader = document.createElement('div');
    checklistDiv.classList.add('task-checklist-container');
    checklistHeader.classList.add('checklist-header');
    checklistHeader.textContent = 'Checklist:';
    checklistDiv.appendChild(checklistHeader);

    if (checklist) {
      let index = 0;
      checklist.forEach((item) => {
        const checklistItem = document.createElement('div');
        const checklistLabel = document.createElement('label');
        const checklistCheckbox = document.createElement('input');


        checklistItem.classList.add('checklist-item');
        checklistItem.setAttribute('data-index', index);
        checklistCheckbox.type = 'checkbox';
        checklistCheckbox.classList.add('checklist-checkbox')

        checklistLabel.textContent = item.getText();
        if (item.isCompleted()) {
          checklistCheckbox.checked = true;
        } else { checklistCheckbox.checked = false; }

        checklistItem.appendChild(checklistLabel);
        checklistLabel.appendChild(checklistCheckbox);
        checklistDiv.appendChild(checklistItem);

        index++
      });
    }
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
      const taskHeader = document.createElement('div');
      const taskContent = document.createElement('div');
      const taskTitleDiv = document.createElement('div');
      const taskDueDateDiv = document.createElement('div');
      const taskTitle = document.createElement('h4');
      const taskDescriptionDiv = document.createElement('div');
      const taskDescription = document.createElement('p');
      const taskNotesDiv = document.createElement('div');
      const taskNotes = document.createElement('p');
      const taskChecklist = createChecklist(task.getChecklist());
      const taskCompleted = document.createElement('input');

      taskCard.classList.add('task-card');
      taskHeader.classList.add('task-header');
      taskContent.classList.add('task-content-container');
      taskCard.setAttribute('data-ID', task.getUUID());
      taskTitleDiv.classList.add('task-title-container');
      taskDueDateDiv.classList.add('task-dueDate-container');
      taskDescriptionDiv.classList.add('task-description-container');
      taskNotesDiv.classList.add('task-notes-container');
      taskCompleted.classList.add('task-checkbox');

      taskTitle.textContent = task.getTitle();
      taskDueDateDiv.textContent = task.getDueDate();
      taskDescription.textContent = task.getDescription();
      taskNotes.textContent = task.getNotes();
      if (taskNotes.textContent === '') {
        taskNotes.textContent = 'No notes.';
      }
      taskCompleted.type = 'checkbox';
      if (task.isCompleted()) {
        taskCompleted.checked = true;
      } else { taskCompleted.checked = false; }

      taskTitleDiv.appendChild(taskTitle);
      taskTitleDiv.appendChild(taskCompleted);
      taskDescriptionDiv.appendChild(taskDescription);
      taskNotesDiv.appendChild(taskNotes);
      taskHeader.appendChild(taskTitleDiv);
      taskHeader.appendChild(taskDueDateDiv);
      taskContent.appendChild(taskDescriptionDiv);
      taskContent.appendChild(taskNotesDiv);
      taskContent.appendChild(taskChecklist);
      taskCard.appendChild(taskHeader);
      taskCard.appendChild(taskContent);

      tasksContainer.appendChild(taskCard);
    });
    pubSub.emit('tasksRendered', tasksContainer);
  };

  const clearTasks = () => {
    const taskCards = tasksContainer.querySelectorAll('.task-card');
    taskCards.forEach((card) => {
      card.remove();
    });
  };

  const clearProjects = () => {
    while (projectsContainer.firstChild) {
      projectsContainer.firstChild.remove();
    }
  };

  const refreshTasksRender = (activeProject) => {
    clearTasks();
    renderTasks(activeProject);
  };

  const refreshProjectsRenderer = (storedProjects) => {
    clearProjects();
    renderProjects(storedProjects);
  };

  const showAddProjectWindow = () => {
    addProjectWindow.classList.add('active');
    overlay.classList.add('active');
    overlay.addEventListener('click', () => {
      addProjectWindow.classList.remove('active');
      overlay.classList.remove('active');
    });
  };

  const showAddTaskWindow = () => {
    addTaskWindow.classList.add('active');
    overlay.classList.add('active');
    overlay.addEventListener('click', () => {
      addTaskWindow.classList.remove('active');
      overlay.classList.remove('active');
    });
  };

  const getNewProjectUserInput = () => {
    const input = {
      title: document.getElementById('new-project-title').value,
      description: document.getElementById('new-project-description').value,
      color: undefined,
    };
    pubSub.emit('newProjectToCreate', input);
  };

  const formatDateInput = (date) => {
    if (date) {
      const dateArr = date.split('-');
      console.log(dateArr);
      console.log(new Date(dateArr[0], dateArr[1], dateArr[2]))
      return format(new Date(dateArr[0], dateArr[1] - 1, dateArr[2]), "dd.MM.yyyy");
    }
    return 'Error in date';
  };

  const getNewTaskUserInput = () => {
    const input = {
      title: document.getElementById('new-task-title').value,
      description: document.getElementById('new-task-description').value,
      priority: document.getElementById('task-priority-select').value,
      dueDate: formatDateInput(document.getElementById('task-due-date').value),
      notes: document.getElementById('task-notes-input').value,
      projectID: document.querySelector('.active-project').dataset.id,
    };
    if (!input.title || !input.dueDate) {
      pubSub.emit('taskAddError', 'Fill out required fields');
    } else {
      pubSub.emit('newTaskToCreate', input);
    }
  };

  const switchToActiveProject = (projectsCards, clickedProject) => {
    for (let i = 0; i < projectsCards.length; i++) {
      projectsCards[i].classList.remove('active-project');
    }
    clickedProject.classList.add('active-project');
  };

  const renderTaskWindowError = (err) => {
    taskWindowErrorContainer.textContent = err;
  };

  pubSub.on('taskAddError', renderTaskWindowError);

  return {
    renderProjects,
    renderTasks,
    refreshTasksRender,
    refreshProjectsRenderer,
    showAddProjectWindow,
    showAddTaskWindow,
    getNewProjectUserInput,
    switchToActiveProject,
    getNewTaskUserInput,
  };
})();

const clickListeners = (() => {
  const addProjectListeners = (div) => {
    const projectsCards = div.children;
    for (let i = 0; i < projectsCards.length; i++) {
      projectsCards[i].addEventListener('click', () => {
        pubSub.emit('aProjectClicked', projectsCards[i].dataset.name);
        DOMController.switchToActiveProject(projectsCards, projectsCards[i]);
      });
    }
  };
  // Add new project/tasks buttons (open window and 'add' userinput data)
  const newProjectButton = document.getElementById('add-new-project-btn');
  newProjectButton.addEventListener('click', DOMController.showAddProjectWindow);

  const addNewProjectButton = document.getElementById('add-project-to-projects');
  addNewProjectButton.addEventListener('click', DOMController.getNewProjectUserInput);

  const newTaskButton = document.getElementById('add-new-task-btn');
  newTaskButton.addEventListener('click', DOMController.showAddTaskWindow);

  const addNewTaskButton = document.getElementById('add-task-to-project');
  addNewTaskButton.addEventListener('click', () => {
    pubSub.emit('taskAddError', ''); // clear out previous error from DOM
    DOMController.getNewTaskUserInput();
  });

  const addTaskCheckboxListeners = (tasksContainer) => {
    const taskCheckboxes = tasksContainer.querySelectorAll('.task-checkbox');
    const checklistCheckboxes = tasksContainer.querySelectorAll('.checklist-checkbox');
    for (let i = 0; i < taskCheckboxes.length; i++) {
      taskCheckboxes[i].addEventListener('click', () => {
        pubSub.emit('aTaskCheckboxToggled', taskCheckboxes[i].closest('.task-card').dataset.id);
      });
    }
    for (let i = 0; i < checklistCheckboxes.length; i++) {
      const taskID = checklistCheckboxes[i].closest('.task-card').dataset.id;
      const checkboxIndex = checklistCheckboxes[i].closest('.checklist-item').dataset.index;
      checklistCheckboxes[i].addEventListener('click', () => {
        pubSub.emit('aChecklistCheckboxToggled', { taskID, index: checkboxIndex });
      });
    }
  };

  pubSub.on('projectsRendered', addProjectListeners);
  pubSub.on('tasksRendered', addTaskCheckboxListeners);
})();

export default DOMController;
