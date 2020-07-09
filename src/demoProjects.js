/* eslint-disable import/extensions */
import projectFactory from './project.js';
import { taskFactory, checklistFactory } from './task';

const demo = (() => {
  const toDo1 = taskFactory('Eat Dinner', 'Have to eat dinner before drinking', '19.06.2020', 'high', 'no notes', [], false);
  const toDo2 = taskFactory('Drink Water', 'Have to drink water to stay hydrated', '19.06.2020', 'high', 'no notes', [], false);
  const project1 = projectFactory('Food', 'All things food related', 'red');
  const checklist1 = checklistFactory('Check1', false);
  const checklist2 = checklistFactory('Check2', true);
  const checklist3 = checklistFactory('Check3', false);

  const toDo3 = taskFactory('Pee', 'Empty you bladder', '19.06.2020', 'high', 'no notes', [], false);
  const toDo4 = taskFactory('Poop', 'Empty your bowels', '19.06.2020', 'high', 'no notes', [], false);
  const project2 = projectFactory('Bio stuff', 'all things bathroom related');

  project1.addTask(toDo1);
  project1.addTask(toDo2);
  project2.addTask(toDo3);
  project2.addTask(toDo4);

  toDo1.addChecklist(checklist1);
  toDo1.addChecklist(checklist2);
  toDo1.addChecklist(checklist3);

  const projects = [project1, project2];

  const getProjects = () => projects;

  return {
    getProjects,
    projects,
  };
})();

export default demo;
