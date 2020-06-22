/* eslint-disable import/extensions */
import pubSub from './pubsub.js';
import taskFactory from './task.js';
import projectFactory from './project.js';
import DOMController from './DOMController.js';
import demo from './demoProjects.js';
import projectStorage from './storage.js';

console.log('webpack init');

const projects = demo.getProjects();

DOMController.renderProjects(projects);

projects.forEach((project) => {
  if (project.isActive()) {
    DOMController.renderTasks(project);
  }
});

pubSub.on('activeProjectChanged', DOMController.refreshTasksRender);
