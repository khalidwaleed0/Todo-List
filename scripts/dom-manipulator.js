const todoFormContent = `<input class="title" type="text" placeholder="Todo Title:" maxlength="36" />
                        <textarea class="details" placeholder="Details:"></textarea>
                        <input class="date" type="date" />
                        <button class="btn-add-todo another-class" type="button">Add</button>`;

const noteFormContent = `<input class="title" type="text" placeholder="Note Title:" maxlength="36" />
                        <textarea class="details" placeholder="Details:"></textarea>
                        <button class="btn-add-note" type="button">Add</button>`;

const projectFormContent = `<input class="title" type="text" placeholder="Project Title:" maxlength="36" />
                            <button class="btn-add-project" type="button">Add</button>`;

const formSidebarButtons = document.querySelectorAll(".form-container .side-bar div span");
const taskCardContent = `<input type="checkbox" class="checkbox" />
					<p class="task-name"></p>
					<div class="task-actions-container">
					<button class="task-details">Details</button>
					<p class="task-date"></p>
					<div class="edit-icon-container icon-container">
					<svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<path
						d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"
					/>
					</svg>
					</div>
					<div class="remove-icon-container icon-container">
					<svg class="remove-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path
						d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
					/>
					</svg>
					</div>
					</div>`;
const notesGrid = `<div class="notes-grid"></div>`;
const noteCardContent = `<input class="title" type="text" placeholder="Todo Title:" maxlength="36" />
						<textarea class="details" placeholder="Details:"></textarea>
						<div class="btn-close">✖</div>`;

let projects = JSON.parse(localStorage.getItem("projects")) ?? [];
let notes = JSON.parse(localStorage.getItem("notes")) ?? [];
let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
updateSidebarCounters();

class Note {
	constructor(title, details) {
		this.title = title;
		this.details = details;
	}
}

class Task {
	constructor(title, details, date, project, isChecked) {
		this.title = title;
		this.details = details;
		this.date = date;
		this.project = project;
		this.isChecked = isChecked;
	}
}

export function addListeners() {
	addIconListeners();
	addCardsListeners();
	addMainSidebarListeners();
	addNewFormListeners();
	addNewFormSidebarListeners();
	addEditFormListeners();
	addFormCloseListeners();
}

function addIconListeners() {
	document.querySelector("div.menu-icon-container").onclick = () => {
		document.querySelector(".side-bar").toggleAttribute("active");
	};
	document.getElementById("btn-add").onclick = () => {
		document.querySelector(".new-form-container").toggleAttribute("active");
		document.querySelector("main .side-bar").removeAttribute("active");
		showTodoForm();
	};
}

function addCardsListeners() {
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
			addTasks(tasks);
			addCardsListeners();
			localStorage.setItem("tasks", JSON.stringify(tasks));
			updateSidebarCounters();
		};
	});
}

function addMainSidebarListeners() {
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
		addTasks(tasks);
		addCardsListeners();
	};
	document.querySelector("#notes").onclick = () => {
		document.querySelector(".main-content").innerHTML = notesGrid;
		addNotes(notes);
		addNotesListeners();
	};
}

function addNotes(_notes) {
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

function addNotesListeners() {
	document.querySelectorAll(".note-card").forEach((card) => {
		card.querySelector(".btn-close").onclick = (e) => {
			let index = e.target.parentElement.getAttribute("note-index");
			notes.splice(index, 1);
			document.querySelector(".notes-grid").innerHTML = "";
			addNotes(notes);
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

function addNewFormListeners() {
	document.querySelector(".new-form-container .todo").onclick = showTodoForm;
	document.querySelector(".new-form-container .project").onclick = showProjectForm;
	document.querySelector(".new-form-container .note").onclick = showNoteForm;
}

function addNewFormSidebarListeners() {
	formSidebarButtons.forEach((item) => {
		item.addEventListener("click", (e) => {
			formSidebarButtons.forEach((e1) => {
				e1.removeAttribute("active");
			});
			e.target.setAttribute("active", "");
		});
	});
}

function addEditFormListeners() {
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

function addFormCloseListeners() {
	document.querySelectorAll(".form-container .btn-close").forEach((btn) => (btn.onclick = closeForm));
}

function showDetails(taskIndex) {
	document.querySelector(".edit-form-container button").setAttribute("task-index", taskIndex.toString());
	document.querySelector(".form-container[active] input.title").value = tasks[taskIndex].title;
	document.querySelector(".form-container[active] textarea.details").value = tasks[taskIndex].details;
	document.querySelector(".form-container[active] input.date").value = tasks[taskIndex].date;
}

function addProjectsListeners() {
	document.querySelectorAll("#projects-container .project span:first-child").forEach((item) => {
		item.onclick = () => {
			let projectTasks = tasks.filter((task) => task.project === item.textContent);
			document.querySelector(".main-content").innerHTML = "";
			addTasks(projectTasks);
			addCardsListeners();
		};
	});
}

function closeForm(e) {
	let form = e.target.parentElement.parentElement;
	let formContainer = form.parentElement;
	form.setAttribute("closed", "");
	setTimeout(() => {
		formContainer.toggleAttribute("active");
		form.removeAttribute("closed");
	}, 400);
}

function showTodoForm() {
	document.querySelector("form .content").innerHTML = todoFormContent;
	document.querySelector(".new-form-container form button").onclick = submitForm;
	document.querySelector("form input.date").value = getCurrentDate();
}

function getCurrentDate() {
	let date = new Date();
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function showProjectForm() {
	document.querySelector("form .content").innerHTML = projectFormContent;
	document.querySelector(".new-form-container form button").onclick = submitForm;
}

function showNoteForm() {
	document.querySelector("form .content").innerHTML = noteFormContent;
	document.querySelector(".new-form-container form button").onclick = submitForm;
}

function submitForm(e) {
	let title = document.querySelector(".new-form-container form input.title").value;
	if (e.target.className.includes("project")) submitProject(title);
	else if (e.target.className.includes("note")) submitNote(title);
	else if (e.target.className.includes("todo")) submitTask(title);
	document.querySelector(".new-form-container form").reset();
	closeForm(e);
	updateSidebarCounters();
}

function updateSidebarCounters() {
	document.querySelector("#home .counter").textContent = tasks.length;
	document.querySelector("#notes .counter").textContent = notes.length;
}

function submitProject(title) {
	projects.push(title);
	localStorage.setItem("projects", JSON.stringify(projects));
	addProjects(projects.slice(-1));
	addMainSidebarListeners();
}

function submitNote(title) {
	let details = document.querySelector(".new-form-container form textarea.details").value;
	notes.push(new Note(title, details));
	if (document.querySelector("#notes span").hasAttribute("active")) {
		addNotes(notes.slice(-1));
		addNotesListeners();
	}
	localStorage.setItem("notes", JSON.stringify(notes));
}

function submitTask(title) {
	let details = document.querySelector(".new-form-container form textarea.details").value;
	let date = document.querySelector(".new-form-container form input.date").value;
	let project = document.querySelector("#projects-container span[active]")?.textContent ?? null;
	tasks.push(new Task(title, details, date, project));
	localStorage.setItem("tasks", JSON.stringify(tasks));
	if (document.querySelector("#home span").hasAttribute("active")) {
		addTasks(tasks.slice(-1));
		addCardsListeners();
	}
}

export function addProjects(projects) {
	for (const project of projects) {
		document.getElementById("projects-container").innerHTML += `<div class="project">
																	<span>${project}</span>
																	<span class="counter">4</span>
																	</div>`;
	}
}

export function addTasks(_tasks) {
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
