const translations = {
    en: {
        "klaus_title": "Klaus",
        "status_label": "Status",
        "status_online": "Online",
        "dashboard_title": "Klaus Dashboard",
        "todo_column": "⏳ To Do",
        "inprogress_column": "🚀 In Progress",
        "done_column": "✅ Done",
        "archived_column": "🗄️ Archived",
        "task_html_structure": "Build the basic HTML structure",
        "task_css_dark_mode": "Create the initial CSS for dark mode",
        "task_kanban_layout": "Implement Kanban board layout",
        "task_github_repo": "Setup GitHub repository"
    },
    fa: {
        "klaus_title": "کلاوس",
        "status_label": "وضعیت",
        "status_online": "آنلاین",
        "dashboard_title": "داشبورد کلاوس",
        "todo_column": "⏳ انجام‌ نشده",
        "inprogress_column": "🚀 در حال انجام",
        "done_column": "✅ انجام ‌شده",
        "archived_column": "🗄️ بایگانی ‌شده",
        "task_html_structure": "ساخت ساختار اولیه HTML",
        "task_css_dark_mode": "ایجاد CSS اولیه برای حالت تیره",
        "task_kanban_layout": "پیاده‌سازی چیدمان کانبان",
        "task_github_repo": "راه‌اندازی مخزن گیت‌هاب"
    }
};

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    localStorage.setItem('language', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'fa';
    setLanguage(savedLang);
});
