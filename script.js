import { addProjects, addTasks, updateSidebarCounters } from "./scripts/dom-manipulator.js";
import { tasks, projects } from "./scripts/form-logic.js";
import { markup } from "./scripts/markup.js";
import {
	addCardsListeners,
	addMainSidebarListeners,
	addNewFormListeners,
	addNewFormSidebarListeners,
	addEditFormListeners,
	addFormCloseListeners,
	addIconListeners,
} from "./scripts/dom-listeners.js";

addProjects(projects);
addTasks(tasks, markup);
updateSidebarCounters();

addIconListeners();
addCardsListeners();
addMainSidebarListeners(markup);
addNewFormListeners();
addNewFormSidebarListeners(markup);
addEditFormListeners();
addFormCloseListeners();
