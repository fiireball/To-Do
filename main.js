!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);var n={events:{},on(e,t){this.events[e]=this.events[e]||[],this.events[e].push(t)},off(e,t){if(this.events[e])for(let o=0;o<this.events[e].length;o++)if(this.events[e][o]===t){this.events[e].splice(o,1);break}},emit(e,t){this.events[e]&&this.events[e].forEach(e=>{e(t)})}};const r=(e,t,o,n,r,c,s)=>{let d=e,i=t,a=o,l=n,u=r,p=c,m=s;return{getType:()=>"Task",getTitle:()=>d,getDescription:()=>i,getDueDate:()=>a,getPriority:()=>l,getNotes:()=>u,getChecklist:()=>p,isCompleted:()=>m,toggleCompleted:()=>{m=!m}}};n.on("newTaskToCreate",e=>{const t=r(e.title,e.description,e.dueDate,e.priority,e.notes,e.checklist,!1);console.log(t),n.emit("newTaskCreated",t)});var c=r;const s=(e,t,o)=>{let r=e,c=t,s=o,d=[],i=!1;const a=()=>d,l=e=>{d=e},u=()=>{i=!0},p=()=>{i=!1};return n.on("aProjectClicked",e=>{i&&p(),e===r&&u(),i&&n.emit("activeProjectChanged",d)}),{getType:()=>"Project",getTitle:()=>r,getDescription:()=>c,getColor:()=>s,getTasks:a,addTask:e=>{const t=a();t.push(e),l(t)},setTasks:l,isActive:()=>i,setActiveTrue:u,setActiveFalse:p}};n.on("newProjectToCreate",e=>{console.log("input: ",e);const t=s(e.title,e.description,e.color);console.log("_newProject.getTitle()",t.getTitle()),console.log("_newProject.getDescription()",t.getDescription()),n.emit("newProjectCreated",t)});var d=s;const i=(()=>{let e=[];return{getAllProjects:()=>e,addNewProject:t=>{e.push(t),n.emit("projectsListChanged",e)},setProjects:t=>{e=t},getActiveProject:()=>{let t;for(let o=0;o<e.length;o++)e[o].isActive()&&(t=e[o]);return console.log("_activeProject: ",t),t}}})();n.on("newTaskCreated",e=>{const t=i.getActiveProject();if(t)t.addTask(e),n.emit("tasksChanged",t);else{const e="ERROR - no current project";console.log(e,t),n.emit("taskAddError",e)}}),n.on("newProjectCreated",i.addNewProject);var a=i;const l=(()=>{const e=document.querySelector(".projects-container"),t=document.querySelector(".tasks-container"),o=document.querySelector(".overlay"),r=document.querySelector(".new-task-window"),c=document.querySelector(".new-project-window"),s=r.querySelector(".task-window-error"),d=t=>{t.forEach(t=>{const o=document.createElement("div"),n=document.createElement("div"),r=document.createElement("div"),c=document.createElement("h4"),s=document.createElement("p"),d=t.getTitle(),i=t.getDescription(),a=t.getColor();o.classList.add("project-card"),n.classList.add("project-card-upper"),r.classList.add("project-card-lower"),t.isActive()&&o.classList.add("active-project"),o.setAttribute("data-name",d),o.style["border-color"]=a,c.textContent=d,s.textContent=i,e.appendChild(o),n.appendChild(c),r.appendChild(s),o.appendChild(n),o.appendChild(r)}),n.emit("projectsRendered",e)},i=e=>{let o;o=Array.isArray(e)?e:e.getTasks(),o.forEach(e=>{const o=document.createElement("div"),n=document.createElement("div"),r=document.createElement("h4"),c=document.createElement("div"),s=document.createElement("p"),d=(e=>{const t=document.createElement("div");return t.classList.add("checklist-container"),e&&e.forEach(e=>{const o=document.createElement("div");o.classList.add("checklist-item"),o.textContent=e,t.appendChild(o)}),t})(e.getChecklist()),i=document.createElement("button");o.classList.add("task-card"),n.classList.add("task-title-container"),c.classList.add("task-description-container"),r.textContent=e.getTitle(),s.textContent=e.getDescription(),e.isCompleted()?i.style["background-color"]="green":i.style["background-color"]="red",n.appendChild(r),n.appendChild(i),c.appendChild(s),o.appendChild(n),o.appendChild(c),o.appendChild(d),t.appendChild(o)})};return n.on("taskAddError",e=>{s.textContent=e}),{renderProjects:d,renderTasks:i,refreshTasksRender:e=>{t.querySelectorAll(".task-card").forEach(e=>{e.remove()}),i(e)},refreshProjectsRenderer:t=>{(()=>{for(;e.firstChild;)e.firstChild.remove()})(),d(t)},showAddProjectWindow:()=>{c.classList.add("active"),o.classList.add("active"),o.addEventListener("click",()=>{c.classList.remove("active"),o.classList.remove("active")})},showAddTaskWindow:()=>{r.classList.add("active"),o.classList.add("active"),o.addEventListener("click",()=>{r.classList.remove("active"),o.classList.remove("active")})},getNewProjectUserInput:()=>{const e={title:document.getElementById("new-project-title").value,description:document.getElementById("new-project-description").value,color:void 0};n.emit("newProjectToCreate",e)},switchToActiveProject:(e,t)=>{for(let t=0;t<e.length;t++)e[t].classList.remove("active-project");t.classList.add("active-project")},getNewTaskUserInput:()=>{const e={title:document.getElementById("new-task-title").value,description:document.getElementById("new-task-description").value,priority:document.getElementById("task-priority-select").value,dueDate:document.getElementById("task-due-date").value,notes:document.getElementById("task-notes-input").value};e.title&&e.dueDate?n.emit("newTaskToCreate",e):n.emit("taskAddError","Fill out required fields")}}})();(()=>{document.getElementById("add-new-project-btn").addEventListener("click",l.showAddProjectWindow);document.getElementById("add-project-to-projects").addEventListener("click",l.getNewProjectUserInput);document.getElementById("add-new-task-btn").addEventListener("click",l.showAddTaskWindow);document.getElementById("add-task-to-project").addEventListener("click",()=>{n.emit("taskAddError",""),l.getNewTaskUserInput()}),n.on("projectsRendered",e=>{const t=e.children;for(let e=0;e<t.length;e++)t[e].addEventListener("click",()=>{n.emit("aProjectClicked",t[e].dataset.name),l.switchToActiveProject(t,t[e])})})})();var u=l;var p=(()=>{const e=c("Eat Dinner","Have to eat dinner before drinking","19.06.2020","high","no notes",["Check1","Check2","check3"],!1),t=c("Drink Water","Have to drink water to stay hydrated","19.06.2020","high","no notes",["Check1","Check2","check3"],!1),o=d("Food","All things food related","red"),n=c("Pee","Empty you bladder","19.06.2020","high","no notes",["Check1","Check2","check3"],!1),r=c("Poop","Empty your bowels","19.06.2020","high","no notes",["Check1","Check2","check3"],!1),s=d("Bio stuff","all things bathroom related");o.addTask(e),o.addTask(t),s.addTask(n),s.addTask(r);const i=[o,s];return{getProjects:()=>i,projects:i}})();console.log("webpack init");const m=p.getProjects();a.setProjects(m);const h=a.getAllProjects();u.renderProjects(h),h.forEach(e=>{e.isActive()&&u.renderTasks(e)}),n.on("activeProjectChanged",u.refreshTasksRender),n.on("tasksChanged",u.refreshTasksRender),n.on("projectsListChanged",u.refreshProjectsRenderer)}]);