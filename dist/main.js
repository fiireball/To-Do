!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r={events:{},on(e,t){this.events[e]=this.events[e]||[],this.events[e].push(t)},off(e,t){if(this.events[e])for(let n=0;n<this.events[e].length;n++)if(this.events[e][n]===t){this.events[e].splice(n,1);break}},emit(e,t){this.events[e]&&this.events[e].forEach(e=>{e(t)})}};var o=(e,t,n,r,o,c,s)=>{let d=e,a=t,i=n,l=r,u=o,p=c,h=s;return{getType:()=>"Task",getTitle:()=>d,getDescription:()=>a,getDueDate:()=>i,getPriority:()=>l,getNotes:()=>u,getChecklist:()=>p,isCompleted:()=>h,toggleCompleted:()=>{h=!h}}};var c=(e,t,n)=>{let o=e,c=t,s=n,d=[],a=!1;const i=()=>d,l=e=>{d=e},u=()=>{a=!0},p=()=>{a=!1};return r.on("aProjectClicked",e=>{a&&p(),e===o&&u(),a&&r.emit("activeProjectChanged",d)}),{getType:()=>"Project",getTitle:()=>o,getDescription:()=>c,getColor:()=>s,getTasks:i,addTask:e=>{const t=i();t.push(e),l(t)},setTasks:l,isActive:()=>a,setActiveTrue:u,setActiveFalse:p}};(()=>{let e=[]})();const s=(()=>{const e=document.querySelector(".projects-container"),t=document.querySelector(".tasks-container"),n=e=>{let n;n=Array.isArray(e)?e:e.getTasks(),n.forEach(e=>{const n=document.createElement("div"),r=document.createElement("div"),o=document.createElement("h4"),c=document.createElement("div"),s=document.createElement("p"),d=(e=>{const t=document.createElement("div");return t.classList.add("checklist-container"),e.forEach(e=>{const n=document.createElement("div");n.classList.add("checklist-item"),n.textContent=e,t.appendChild(n)}),t})(e.getChecklist()),a=document.createElement("button");n.classList.add("task-card"),r.classList.add("task-title-container"),c.classList.add("task-description-container"),o.textContent=e.getTitle(),s.textContent=e.getDescription(),e.isCompleted()?a.style["background-color"]="green":a.style["background-color"]="red",r.appendChild(o),r.appendChild(a),c.appendChild(s),n.appendChild(r),n.appendChild(c),n.appendChild(d),t.appendChild(n)})};return{renderProjects:t=>{t.forEach(t=>{const n=document.createElement("div"),r=document.createElement("div"),o=document.createElement("div"),c=document.createElement("h4"),s=document.createElement("p"),d=t.getTitle(),a=t.getDescription(),i=t.getColor();n.classList.add("project-card"),r.classList.add("project-card-upper"),o.classList.add("project-card-lower"),t.isActive()&&(n.classList.add("active-project"),n.style["background-color"]="darkorange"),n.setAttribute("data-name",d),n.style["border-color"]=i,c.textContent=d,s.textContent=a,e.appendChild(n),r.appendChild(c),o.appendChild(s),n.appendChild(r),n.appendChild(o)}),r.emit("projectsRendered",e)},renderTasks:n,refreshTasksRender:e=>{t.querySelectorAll(".task-card").forEach(e=>{e.remove()}),n(e)},showAddProjectWindow:()=>{const e=document.querySelector(".new-project-window"),t=document.querySelector(".overlay");e.classList.add("active"),t.classList.add("active"),t.addEventListener("click",()=>{e.classList.remove("active"),t.classList.remove("active")})}}})();document.getElementById("add-new-project-btn").addEventListener("click",s.showAddProjectWindow),r.on("projectsRendered",e=>{const t=e.children;for(let e=0;e<t.length;e++)t[e].addEventListener("click",()=>{r.emit("aProjectClicked",t[e].dataset.name)})});var d=s;var a=(()=>{const e=o("Eat Dinner","Have to eat dinner before drinking","19.06.2020","high","no notes",["Check1","Check2","check3"],!1),t=o("Drink Water","Have to drink water to stay hydrated","19.06.2020","high","no notes",["Check1","Check2","check3"],!1),n=c("Food","All things food related","red"),r=o("Pee","Empty you bladder","19.06.2020","high","no notes",["Check1","Check2","check3"],!1),s=o("Poop","Empty your collon","19.06.2020","high","no notes",["Check1","Check2","check3"],!1),d=c("Bio stuff","all things bathroom related");n.addTask(e),n.addTask(t),d.addTask(r),d.addTask(s);const a=[n,d];return{getProjects:()=>a,projects:a}})();console.log("webpack init");const i=a.getProjects();d.renderProjects(i),i.forEach(e=>{e.isActive()&&d.renderTasks(e)}),r.on("activeProjectChanged",d.refreshTasksRender)}]);