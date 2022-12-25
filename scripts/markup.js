export const markup = {
	todoFormContent: `<input class="title" type="text" placeholder="Todo Title:" maxlength="36" />
                            <textarea class="details" placeholder="Details:"></textarea>
                            <input class="date" type="date" />
                            <button class="btn-add-todo another-class" type="button">Add</button>`,

	noteFormContent: `<input class="title" type="text" placeholder="Note Title:" maxlength="36" />
                            <textarea class="details" placeholder="Details:"></textarea>
                            <button class="btn-add-note" type="button">Add</button>`,

	projectFormContent: `<input class="title" type="text" placeholder="Project Title:" maxlength="36" />
                                <button class="btn-add-project" type="button">Add</button>`,

	formSidebarButtons: document.querySelectorAll(".form-container .side-bar div span"),
	taskCardContent: `<input type="checkbox" class="checkbox" />
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
                        </div>`,
	notesGrid: `<div class="notes-grid"></div>`,
	noteCardContent: `<input class="title" type="text" placeholder="Todo Title:" maxlength="36" />
                            <textarea class="details" placeholder="Details:"></textarea>
                            <div class="btn-close">✖</div>`,
};
