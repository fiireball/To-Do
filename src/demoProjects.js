/* eslint-disable import/extensions */
import projectFactory from './project.js';
import taskFactory from './task.js';

const demo = (() => {
  const toDo1 = taskFactory('Eat Dinner', 'Have to eat dinner before drinking', '19.06.2020', 'high', 'no notes', ['Check1', 'Check2', 'check3'], false);
  const toDo2 = taskFactory('Drink Water', 'Have to drink water to stay hydrated', '19.06.2020', 'high', 'no notes', ['Check1', 'Check2', 'check3'], false);
  const project1 = projectFactory('Food', 'All things food related', 'red');

  const toDo3 = taskFactory('Pee', 'Empty your collon', '19.06.2020', 'high', 'no notes', ['Check1', 'Check2', 'check3'], false);
  const toDo4 = taskFactory('Poop', 'Empty you bladder', '19.06.2020', 'high', 'no notes', ['Check1', 'Check2', 'check3'], false);
  const project2 = projectFactory('Bio stuff', 'all things bathroom related');

  project1.addTask(toDo1);
  project1.addTask(toDo2);
  project2.addTask(toDo3);
  project2.addTask(toDo4);

  project2.toggleIsActive();

  const projects = [project1, project2];

  const getProjects = () => projects;

  return {
    getProjects,
    projects,
  };
})();

export default demo;
