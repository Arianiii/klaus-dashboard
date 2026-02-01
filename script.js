const translations = {
    en: {
        "klaus_title": "Klaus",
        "status_label": "Status",
        "status_online": "Online",
        "dashboard_title": "Klaus Dashboard",
        "todo_column": "To Do",
        "inprogress_column": "In Progress",
        "done_column": "Done",
        "archived_column": "Archived",
        "task_html_structure": "Build the basic HTML structure",
        "task_css_dark_mode": "Create the initial CSS for dark mode",
        "task_kanban_layout": "Implement Kanban board layout",
        "task_github_repo": "Setup GitHub repository",
        "add_new_task_title": "Add New Task",
        "task_input_placeholder": "Task title...",
        "save_task_btn": "Save",
        "close_modal_btn": "Cancel"
    },
    fa: {
        "klaus_title": "کلاوس",
        "status_label": "وضعیت",
        "status_online": "آنلاین",
        "dashboard_title": "داشبورد کلاوس",
        "todo_column": "انجام‌ نشده",
        "inprogress_column": "در حال انجام",
        "done_column": "انجام ‌شده",
        "archived_column": "بایگانی ‌شده",
        "task_html_structure": "ساخت ساختار اولیه HTML",
        "task_css_dark_mode": "ایجاد CSS اولیه برای حالت تیره",
        "task_kanban_layout": "پیاده‌سازی چیدمان کانبان",
        "task_github_repo": "راه‌اندازی مخزن گیت‌هاب",
        "add_new_task_title": "اضافه کردن تسک جدید",
        "task_input_placeholder": "عنوان تسک...",
        "save_task_btn": "ذخیره",
        "close_modal_btn": "انصراف"
    }
};

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
    feather.replace(); // Re-render icons after text change
}

function createTaskCard(taskText) {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;

    const p = document.createElement('p');
    p.textContent = taskText;
    card.appendChild(p);

    const span = document.createElement('span');
    span.className = 'date';
    span.textContent = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
    card.appendChild(span);
    
    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Setup ---
    const savedLang = localStorage.getItem('language') || 'fa';
    setLanguage(savedLang);

    // --- Modal Elements ---
    const modal = document.getElementById('taskModal');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const todoColumn = document.getElementById('todo-column');

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
            const newCard = createTaskCard(taskText);
            todoColumn.appendChild(newCard);
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
            draggable: '.card'
        });
    });
});
