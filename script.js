import { addListeners, addProjects, addTasks } from "/scripts/dom-manipulator.js";

if (storageAvailable("localStorage")) {
	let projects = JSON.parse(localStorage.getItem("projects")) ?? [];
	let notes = JSON.parse(localStorage.getItem("notes")) ?? [];
	let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
	addProjects(projects);
	addTasks(tasks);
	addListeners();
}

function storageAvailable(type) {
	let storage;
	try {
		storage = window[type];
		const x = "__storage_test__";
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return (
			e instanceof DOMException &&
			// everything except Firefox
			(e.code === 22 ||
				// Firefox
				e.code === 1014 ||
				// test name field too, because code might not be present
				// everything except Firefox
				e.name === "QuotaExceededError" ||
				// Firefox
				e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
			// acknowledge QuotaExceededError only if there's something already stored
			storage &&
			storage.length !== 0
		);
	}
}
