/* eslint-disable import/extensions */
import pubSub from './pubsub.js';
import taskFactory from './task.js';
import projectFactory from './project.js';
import DOMController from './DOMController.js';
import demo from './demoProjects.js';
import projectStorage from './storage.js';

console.log('webpack init');

const demoProjects = demo.getProjects();

projectStorage.setProjects(demoProjects);

const projects = projectStorage.getAllProjects();

DOMController.renderProjects(projects);

projects.forEach((project) => {
  if (project.isActive()) {
    DOMController.renderTasks(project);
  }
});

pubSub.on('activeProjectChanged', DOMController.refreshTasksRender);
pubSub.on('tasksChanged', DOMController.refreshTasksRender);
pubSub.on('projectsListChanged', DOMController.refreshProjectsRenderer);
