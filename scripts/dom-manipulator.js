const todoFormContent = `<input class="title" type="text" placeholder="Todo Title:" maxlength="36" />
                        <textarea class="details" placeholder="Details:"></textarea>
                        <input class="date" type="date" />
                        <button type="button">Add</button>`;

const noteFormContent = `<input class="title" type="text" placeholder="Note Title:" maxlength="36" />
                        <textarea class="details" placeholder="Details:"></textarea>
                        <button type="button">Add</button>`;

const projectFormContent = `<input class="title" type="text" placeholder="Project Title:" maxlength="36" />
                            <button type="button">Add</button>`;

const mainSidebarButtons = document.querySelectorAll(".side-bar * span:first-child");
const formSidebarButtons = document.querySelectorAll(".form-container .side-bar div span");

export function addListeners() {
	addIconListeners();
	addMainSidebarListeners();
	addNewFormListeners();
	addNewFormSidebarListeners();
	addEditFormListeners();
}

function addIconListeners() {
	document.querySelector("svg.menu-icon").onclick = () => {
		document.querySelector(".side-bar").toggleAttribute("active");
	};
	document.getElementById("btn-add").onclick = () => {
		document.querySelector(".new-form-container").toggleAttribute("active");
		showTodoForm();
	};
	document.querySelectorAll("svg.edit-icon").forEach((item) => {
		item.onclick = () => {
			document.querySelector(".edit-form-container").toggleAttribute("active");
		};
	});
}

function addMainSidebarListeners() {
	mainSidebarButtons.forEach((item) => {
		item.addEventListener("click", (e) => {
			mainSidebarButtons.forEach((e1) => {
				e1.removeAttribute("active");
			});
			e.target.setAttribute("active", "");
		});
	});
}

function addNewFormListeners() {
	document.querySelector(".new-form-container .btn-close").onclick = () => {
		document.querySelector(".new-form-container form").setAttribute("closed", "");
		setTimeout(() => {
			document.querySelector(".new-form-container").toggleAttribute("active");
			document.querySelector(".new-form-container form").removeAttribute("closed");
		}, 400);
	};
	document.querySelector(".form-container .todo").onclick = showTodoForm;
	document.querySelector(".form-container .project").onclick = showProjectForm;
	document.querySelector(".form-container .note").onclick = showNoteForm;
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
	document.querySelector(".edit-form-container .btn-close").onclick = () => {
		document.querySelector(".edit-form-container form").setAttribute("closed", "");
		setTimeout(() => {
			document.querySelector(".edit-form-container").toggleAttribute("active");
			document.querySelector(".edit-form-container form").removeAttribute("closed");
		}, 400);
	};
}

function showTodoForm() {
	document.querySelector("form .content").innerHTML = todoFormContent;
}

function showProjectForm() {
	document.querySelector("form .content").innerHTML = projectFormContent;
}

function showNoteForm() {
	document.querySelector("form .content").innerHTML = noteFormContent;
}
