import { addProjects, addTasks, addNotes, Task, Note, updateSidebarCounters } from "./dom-manipulator.js";
import { addCardsListeners, addMainSidebarListeners, addNotesListeners } from "./dom-listeners.js";
import { markup } from "./markup.js";

export let notes = JSON.parse(localStorage.getItem("notes")) ?? [];
export let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
export let projects = JSON.parse(localStorage.getItem("projects")) ?? [];

export function submitProject(title) {
	projects.push(title);
	localStorage.setItem("projects", JSON.stringify(projects));
	addProjects(projects.slice(-1));
	addMainSidebarListeners(markup);
}

export function submitNote(title) {
	let details = document.querySelector(".new-form-container form textarea.details").value;
	notes.push(new Note(title, details));
	if (document.querySelector("#notes span").hasAttribute("active")) {
		addNotes(notes.slice(-1), markup);
		addNotesListeners();
	}
	localStorage.setItem("notes", JSON.stringify(notes));
}

export function submitTask(title) {
	let details = document.querySelector(".new-form-container form textarea.details").value;
	let date = document.querySelector(".new-form-container form input.date").value;
	let project = document.querySelector("#projects-container span[active]")?.textContent ?? null;
	tasks.push(new Task(title, details, date, project));
	localStorage.setItem("tasks", JSON.stringify(tasks));
	if (
		document.querySelector("#home span").hasAttribute("active") ||
		document.querySelector("#projects-container span[active]")?.hasAttribute("active")
	) {
		addTasks(tasks.slice(-1), markup);
		addCardsListeners();
	}
}

export function submitForm(e) {
	let title = document.querySelector(".new-form-container form input.title").value;
	if (e.target.className.includes("project")) submitProject(title);
	else if (e.target.className.includes("note")) submitNote(title);
	else if (e.target.className.includes("todo")) submitTask(title);
	document.querySelector(".new-form-container form").reset();
	closeForm(e);
	updateSidebarCounters();
}

export function closeForm(e) {
	let form = e.target.parentElement.parentElement;
	let formContainer = form.parentElement;
	form.setAttribute("closed", "");
	setTimeout(() => {
		formContainer.toggleAttribute("active");
		form.removeAttribute("closed");
	}, 400);
}
