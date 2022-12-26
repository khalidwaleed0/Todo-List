import { submitForm } from "./form-logic.js";
import { notes, tasks, getCurrentDate, getTodayTasks, getWeekTasks } from "./form-logic.js";

document.querySelector("#home span").setAttribute("active", "");

export class Note {
	constructor(title, details) {
		this.title = title;
		this.details = details;
	}
}

export class Task {
	constructor(title, details, date, project, isChecked) {
		this.title = title;
		this.details = details;
		this.date = date;
		this.project = project;
		this.isChecked = isChecked;
	}
}

export function addProjects(projects) {
	for (const project of projects) {
		document.getElementById("projects-container").innerHTML += `<div class="project">
																	<span class="title">${project}</span>
																	<span class="counter">0</span>
																	</div>`;
	}
}

export function addTasks(_tasks, { taskCardContent }) {
	let index = 0;
	if (_tasks.length === 1) index = tasks.length - 1;
	for (const task of _tasks) {
		let taskCard = document.createElement("div");
		taskCard.innerHTML = taskCardContent;
		taskCard.className = "task-card";
		taskCard.querySelector(".task-name").textContent = task.title;
		taskCard.querySelector(".checkbox").checked = task.isChecked;
		taskCard.querySelector(".task-date").textContent = task.date;
		taskCard.setAttribute("task-index", index.toString());
		document.querySelector(".main-content").appendChild(taskCard);
		index++;
	}
}

export function addNotes(_notes, { noteCardContent }) {
	let index = 0;
	if (_notes.length === 1) index = notes.length - 1;
	for (const note of _notes) {
		let noteCard = document.createElement("div");
		noteCard.className = "note-card";
		noteCard.innerHTML = noteCardContent;
		noteCard.querySelector("input.title").value = note.title;
		noteCard.querySelector("textarea.details").value = note.details;
		noteCard.setAttribute("note-index", index.toString());
		document.querySelector(".notes-grid").appendChild(noteCard);
		index++;
	}
}

export function showProjectForm({ projectFormContent }) {
	document.querySelector("form .content").innerHTML = projectFormContent;
	document.querySelector(".new-form-container form button").onclick = submitForm;
}

export function showNoteForm({ noteFormContent }) {
	document.querySelector("form .content").innerHTML = noteFormContent;
	document.querySelector(".new-form-container form button").onclick = submitForm;
}

export function showDetails(taskIndex) {
	document.querySelector(".edit-form-container button").setAttribute("task-index", taskIndex.toString());
	document.querySelector(".form-container[active] input.title").value = tasks[taskIndex].title;
	document.querySelector(".form-container[active] textarea.details").value = tasks[taskIndex].details;
	document.querySelector(".form-container[active] input.date").value = tasks[taskIndex].date;
}

export function showTodoForm({ todoFormContent }) {
	document.querySelector("form .content").innerHTML = todoFormContent;
	document.querySelector(".new-form-container form button").onclick = submitForm;
	document.querySelector("form input.date").value = getCurrentDate();
}

export function updateSidebarCounters() {
	document.querySelector("#home .counter").textContent = tasks.length;
	document.querySelector("#today .counter").textContent = getTodayTasks().length;
	document.querySelector("#week .counter").textContent = getWeekTasks().length;
	document.querySelector("#notes .counter").textContent = notes.length;
	document.querySelectorAll("#projects-container .project").forEach((e) => {
		let title = e.querySelector(".title").textContent;
		let counter = e.querySelector(".counter");
		let projectLength = tasks.filter((task) => task.project === title).length;
		counter.textContent = projectLength;
	});
}
