const todoFormContent = `<input class="title" type="text" placeholder="Todo Title:" maxlength="36" />
                        <textarea class="details" placeholder="Details:"></textarea>
                        <input class="date" type="date" />
                        <button type="button">Add</button>`;

const noteFormContent = `<input class="title" type="text" placeholder="Note Title:" maxlength="36" />
                        <textarea class="details" placeholder="Details:"></textarea>
                        <button type="button">Add</button>`;

const projectFormContent = `<input class="title" type="text" placeholder="Project Title:" maxlength="36" />
                            <button type="button">Add</button>`;

const sidebarButtons = document.querySelectorAll(".side-bar * span:first-child");
const formNavButtons = document.querySelectorAll(".form-container .side-bar div span");

function showTodoForm() {
	document.querySelector("form .content").innerHTML = todoFormContent;
}

function showProjectForm() {
	document.querySelector("form .content").innerHTML = projectFormContent;
}

function showNoteForm() {
	document.querySelector("form .content").innerHTML = noteFormContent;
}

export function addListeners() {
	document.querySelector("svg.menu-icon").onclick = () => {
		document.querySelector(".side-bar").toggleAttribute("active");
	};

	document.getElementById("btn-add").onclick = () => {
		document.querySelector(".form-container").toggleAttribute("active");
		showTodoForm();
	};

	document.querySelector(".btn-close").onclick = () => {
		document.querySelector(".form-container").toggleAttribute("active");
	};

	document.querySelector(".form-container .todo").onclick = showTodoForm;
	document.querySelector(".form-container .project").onclick = showProjectForm;
	document.querySelector(".form-container .note").onclick = showNoteForm;

	formNavButtons.forEach((item) => {
		item.addEventListener("click", (e) => {
			formNavButtons.forEach((e1) => {
				e1.removeAttribute("active");
			});
			e.target.setAttribute("active", "");
		});
	});

	sidebarButtons.forEach((item) => {
		item.addEventListener("click", (e) => {
			sidebarButtons.forEach((e1) => {
				e1.removeAttribute("active");
			});
			e.target.setAttribute("active", "");
		});
	});
}
