/* eslint-disable import/extensions */
import pubSub from './pubsub.js';
import taskFactory from './task.js';
import projectFactory from './project.js';
import DOMController from './DOMController.js'
import demo from './demoProjects.js'

console.log('webpack init');

const projects = demo.getProjects();

DOMController.renderProjects(projects);


projects.forEach((project) => {
  if (project.IsActive()) {
    DOMController.renderTasks(project);
  }
})