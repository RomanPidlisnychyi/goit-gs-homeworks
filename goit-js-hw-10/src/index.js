import './styles.css';
import menu from './menu.json';
import menuTemplate from './menuTemplate.hbs';

const markup = menuTemplate(menu);

const refs = {
    menuRef: document.querySelector('.js-menu'),
    bodyRef: document.querySelector('body'),
    switchInputRef: document.querySelector('.js-switch-input'),
};

const theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};

refs.bodyRef.classList.add(localStorage.theme);

savedThemeClass();

refs.switchInputRef.addEventListener('change', themeSwitchHandler);

function themeSwitchHandler(event) {
    // const defaultTheme = event.path[0].checked;
    localStorage.setItem(
        'theme',
        refs.switchInputRef.checked ? theme.DARK : theme.LIGHT,
    );
    addThemeClass();
}

function savedThemeClass() {
    if (localStorage.theme === theme.DARK) {
        refs.switchInputRef.checked = true;
    }
}

function addThemeClass() {
    if (localStorage.theme === theme.DARK) {
        refs.bodyRef.classList.remove('light-theme');
        refs.bodyRef.classList.add('dark-theme');
    }
    if (localStorage.theme === theme.LIGHT) {
        refs.bodyRef.classList.remove('dark-theme');
        refs.bodyRef.classList.add('light-theme');
    }
}

refs.menuRef.insertAdjacentHTML('beforeend', markup);