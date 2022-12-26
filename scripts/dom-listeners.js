import {
	addNotes,
	addTasks,
	showProjectForm,
	showNoteForm,
	showDetails,
	showTodoForm,
	updateSidebarCounters,
} from "./dom-manipulator.js";
import { markup } from "./markup.js";
import { tasks, notes, getTodayTasks, getWeekTasks, closeForm } from "./form-logic.js";

export function addIconListeners() {
	document.querySelector("div.menu-icon-container").onclick = () => {
		document.querySelector(".side-bar").toggleAttribute("active");
	};
	document.getElementById("btn-add").onclick = () => {
		document.querySelector(".new-form-container").toggleAttribute("active");
		document.querySelector("main .side-bar").removeAttribute("active");
		showTodoForm(markup);
	};
}

export function addCardsListeners() {
	document.querySelectorAll("input.checkbox").forEach((item) => {
		item.onchange = (e) => {
			let index = e.target.parentElement.getAttribute("task-index");
			tasks[index].isChecked = e.target.checked;
			localStorage.setItem("tasks", JSON.stringify(tasks));
		};
	});
	document.querySelectorAll("button.task-details").forEach((item) => {
		item.onclick = (e) => {
			document.querySelector(".details-form-container").toggleAttribute("active");
			let taskIndex = e.target.parentElement.parentElement.getAttribute("task-index");
			showDetails(taskIndex);
			document.querySelector("main .side-bar").removeAttribute("active");
		};
	});
	document.querySelectorAll("div.edit-icon-container").forEach((item) => {
		item.onclick = (e) => {
			document.querySelector(".edit-form-container").toggleAttribute("active");
			let taskIndex = e.target.parentElement.parentElement.getAttribute("task-index");
			showDetails(taskIndex);
			document.querySelector("main .side-bar").removeAttribute("active");
		};
	});
	document.querySelectorAll("div.remove-icon-container").forEach((item) => {
		item.onclick = (e) => {
			let taskIndex = e.target.parentElement.parentElement.getAttribute("task-index");
			tasks.splice(taskIndex, 1);
			document.querySelector(".main-content").innerHTML = "";
			addTasks(tasks, markup);
			addCardsListeners();
			localStorage.setItem("tasks", JSON.stringify(tasks));
			updateSidebarCounters();
		};
	});
}

export function addMainSidebarListeners({ notesGrid }) {
	let mainSidebarButtons = document.querySelectorAll("main .side-bar * span:first-child");
	mainSidebarButtons.forEach((item) => {
		item.addEventListener("click", (e) => {
			document.querySelector("main .side-bar").removeAttribute("active");
			mainSidebarButtons.forEach((e1) => {
				e1.removeAttribute("active");
			});
			e.target.setAttribute("active", "");
		});
	});
	addProjectsListeners();
	document.querySelector("#home").onclick = () => {
		document.querySelector(".main-content").innerHTML = "";
		addTasks(tasks, markup);
		addCardsListeners();
	};
	document.querySelector("#today").onclick = () => {
		document.querySelector(".main-content").innerHTML = "";
		let todayTasks = getTodayTasks();
		addTasks(todayTasks, markup);
		addCardsListeners();
	};
	document.querySelector("#week").onclick = () => {
		document.querySelector(".main-content").innerHTML = "";
		let weekTasks = getWeekTasks();
		addTasks(weekTasks, markup);
		addCardsListeners();
	};
	document.querySelector("#notes").onclick = () => {
		document.querySelector(".main-content").innerHTML = notesGrid;
		addNotes(notes, markup);
		addNotesListeners();
	};
}

export function addNotesListeners() {
	document.querySelectorAll(".note-card").forEach((card) => {
		card.querySelector(".btn-close").onclick = (e) => {
			let index = e.target.parentElement.getAttribute("note-index");
			notes.splice(index, 1);
			document.querySelector(".notes-grid").innerHTML = "";
			addNotes(notes, markup);
			addNotesListeners();
			localStorage.setItem("notes", JSON.stringify(notes));
			updateSidebarCounters();
		};
		card.querySelector("input.title").onchange = (e) => {
			let index = e.target.parentElement.getAttribute("note-index");
			notes[index].title = e.target.value;
			localStorage.setItem("notes", JSON.stringify(notes));
		};
		card.querySelector("textarea.details").onchange = (e) => {
			let index = e.target.parentElement.getAttribute("note-index");
			notes[index].details = e.target.value;
			localStorage.setItem("notes", JSON.stringify(notes));
		};
	});
}

export function addNewFormListeners() {
	document.querySelector(".new-form-container .todo").onclick = () => showTodoForm(markup);
	document.querySelector(".new-form-container .project").onclick = () => showProjectForm(markup);
	document.querySelector(".new-form-container .note").onclick = () => showNoteForm(markup);
}

export function addNewFormSidebarListeners({ formSidebarButtons }) {
	formSidebarButtons.forEach((item) => {
		item.addEventListener("click", (e) => {
			formSidebarButtons.forEach((e1) => {
				e1.removeAttribute("active");
			});
			e.target.setAttribute("active", "");
		});
	});
}

export function addEditFormListeners() {
	document.querySelector(".edit-form-container button").onclick = (e) => {
		let index = e.target.getAttribute("task-index");
		let title = document.querySelector(".edit-form-container input.title").value;
		let details = document.querySelector(".edit-form-container textarea.details").value;
		let date = document.querySelector(".edit-form-container input.date").value;
		let card = document.querySelector(`.task-card[task-index="${index}"]`);
		card.querySelector(".task-name").textContent = title;
		card.querySelector(".task-date").textContent = date;
		tasks[index].title = title;
		tasks[index].details = details;
		tasks[index].date = date;
		localStorage.setItem("tasks", JSON.stringify(tasks));
		document.querySelector(".edit-form-container form").reset();
		closeForm(e);
	};
}

export function addFormCloseListeners() {
	document.querySelectorAll(".form-container .btn-close").forEach((btn) => (btn.onclick = closeForm));
}

export function addProjectsListeners() {
	document.querySelectorAll("#projects-container .project span:first-child").forEach((item) => {
		item.onclick = () => {
			let projectTasks = tasks.filter((task) => task.project === item.textContent);
			document.querySelector(".main-content").innerHTML = "";
			addTasks(projectTasks, markup);
			addCardsListeners();
		};
	});
}
