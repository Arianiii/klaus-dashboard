const translations = {
    en: {
        "klaus_title": "Klaus",
        "status_online": "Online",
        "ready_for_tasks": "Ready for tasks",
        "dashboard_title": "Klaus Dashboard",
        "todo_column": "To Do",
        "inprogress_column": "In Progress",
        "done_column": "Done",
        "archived_column": "Archived",
        "add_new_task_title": "Add New Task",
        "task_input_placeholder": "Task title...",
        "save_task_btn": "Save",
        "close_modal_btn": "Cancel"
    },
    fa: {
        "klaus_title": "کلاوس",
        "status_online": "آنلاین",
        "ready_for_tasks": "آماده برای تسک‌ها",
        "dashboard_title": "داشبورد کلاوس",
        "todo_column": "انجام‌ نشده",
        "inprogress_column": "در حال انجام",
        "done_column": "انجام ‌شده",
        "archived_column": "بایگانی ‌شده",
        "add_new_task_title": "اضافه کردن تسک جدید",
        "task_input_placeholder": "عنوان تسک...",
        "save_task_btn": "ذخیره",
        "close_modal_btn": "انصراف"
    }
};

let tasks = {};

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const isPlaceholder = element.hasAttribute('placeholder');

        if (translations[lang] && translations[lang][key]) {
            if (isPlaceholder) {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    localStorage.setItem('language', lang);
    feather.replace();
}

function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.dataset.id = task.id;

    const p = document.createElement('p');
    p.textContent = task.text;
    card.appendChild(p);

    const span = document.createElement('span');
    span.className = 'date';
    span.textContent = task.date;
    card.appendChild(span);
    
    return card;
}

function renderTasks() {
    // Clear all columns first
    document.querySelectorAll('.kanban-board .column').forEach(column => {
        // Clear only cards, not the title
        column.querySelectorAll('.card').forEach(card => card.remove());
    });

    for (const columnId in tasks) {
        const columnElement = document.getElementById(columnId);
        if (columnElement) {
            tasks[columnId].forEach(task => {
                const card = createTaskCard(task);
                columnElement.appendChild(card);
            });
        }
    }
}

function saveTasks() {
    const boardState = {};
    document.querySelectorAll('.kanban-board .column').forEach(column => {
        const columnId = column.id;
        const columnTasks = [];
        column.querySelectorAll('.card').forEach(card => {
            columnTasks.push({
                id: card.dataset.id,
                text: card.querySelector('p').textContent,
                date: card.querySelector('.date').textContent
            });
        });
        boardState[columnId] = columnTasks;
    });
    localStorage.setItem('kanbanBoard', JSON.stringify(boardState));
}


document.addEventListener('DOMContentLoaded', () => {
    // --- Setup & Load Data ---
    const savedLang = localStorage.getItem('language') || 'fa';
    setLanguage(savedLang);

    const savedTasks = localStorage.getItem('kanbanBoard');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    } else {
        // Initial dummy data if nothing is saved
        tasks = {
            "todo-column": [],
            "inprogress-column": [],
            "done-column": [],
            "archived-column": []
        };
    }
    renderTasks();

    // --- Modal Elements ---
    const modal = document.getElementById('taskModal');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const taskInput = document.getElementById('taskInput');

    // --- Event Listeners ---
    addTaskBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        taskInput.focus();
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        taskInput.value = '';
    });

    saveTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const newTask = {
                id: `task-${Date.now()}`,
                text: taskText,
                date: new Date().toLocaleDateString('en-CA')
            };
            tasks['todo-column'].push(newTask);
            renderTasks();
            saveTasks();
            taskInput.value = '';
            modal.style.display = 'none';
        }
    });
    
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            taskInput.value = '';
        }
    });

    // --- Initialize SortableJS ---
    const columns = document.querySelectorAll('.kanban-board .column');
    columns.forEach(column => {
        new Sortable(column, {
            group: 'kanban',
            animation: 150,
            ghostClass: 'sortable-ghost',
            handle: '.card',
            draggable: '.card',
            onEnd: saveTasks // Save state after drag-and-drop
        });
    });
});
